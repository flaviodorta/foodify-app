import { prisma } from '../../../utils/prismaClient';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { statusCode } from '../../../config/status-code';
import env from '../../../utils/validateEnv';

export const loginService = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  const { email, password } = req.body;

  if (!email)
    return res
      .status(statusCode.error.badRequest)
      .json({ message: 'Email is required.' });

  if (!password)
    return res
      .status(statusCode.error.badRequest)
      .json({ message: 'Password is required.' });

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.sendStatus(statusCode.error.unauthorized);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    const accessToken = jwt.sign(
      {
        email: user.email,
        roles: user.roles,
      },
      env.ACCESS_TOKEN_SECRET,
      { expiresIn: 600 * 1000 }
    );

    const newRefreshToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      env.REFRESH_TOKEN_SECRET,
      { expiresIn: 30 * 24 * 60 * 60 * 1000 }
    );

    if (cookies?.refreshToken) {
      const t = await prisma.refreshToken.findFirst({
        where: { token: cookies.refreshToken },
      });

      if (t?.token) {
        const d = await prisma.refreshToken.delete({
          where: { token: t?.token },
        });
      }

      res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }

    const t3 = await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: user.id,
      },
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(statusCode.success.ok).json({ accessToken });
  } else {
    return res.sendStatus(statusCode.error.unauthorized);
  }
};
