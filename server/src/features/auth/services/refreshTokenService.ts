import { Request, Response } from 'express';
import { statusCode } from '../../../config/status-code';
import { prisma } from '../../../utils/prismaClient';
import jwt from 'jsonwebtoken';
import env from '../../../utils/validateEnv';

export const refreshTokenService = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken)
    return res.sendStatus(statusCode.error.unauthorized);

  const refreshTokenCookied = cookies.refreshToken;

  console.log(refreshTokenCookied);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  const user = await prisma.user.findFirst({
    where: {
      refreshTokens: { some: { token: refreshTokenCookied } },
    },
  });

  if (!user) {
    jwt.verify(
      refreshTokenCookied,
      env.REFRESH_TOKEN_SECRET,
      async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err || !decoded.email) res.sendStatus(statusCode.error.forbidden);

        const hackedUserRefreshTokens = await prisma.user
          .findUnique({
            where: { email: decoded.email },
          })
          .refreshTokens();

        if (hackedUserRefreshTokens) {
          for (const rt of hackedUserRefreshTokens)
            await prisma.refreshToken.delete({ where: { token: rt.token } });
        }
      }
    );

    return res.sendStatus(statusCode.error.forbidden);
  } else {
    // await prisma.refreshToken.delete({ where: { token: refreshTokenCookied } });

    jwt.verify(
      refreshTokenCookied,
      env.REFRESH_TOKEN_SECRET,
      async (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err || decoded.email !== user.email) {
          return res.json(statusCode.error.forbidden);
        }

        const accessToken = jwt.sign(
          {
            email: decoded?.email,
            roles: user.roles,
          },
          env.ACCESS_TOKEN_SECRET,
          { expiresIn: 600 * 1000 }
        );

        const newRefreshToken = jwt.sign(
          {
            email: user.email,
          },
          env.REFRESH_TOKEN_SECRET,
          { expiresIn: 30 * 24 * 60 * 60 * 1000 }
        );

        await prisma.refreshToken.create({
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

        return res.json({ accessToken });
      }
    );
  }
};
