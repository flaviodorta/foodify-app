import { Request, Response } from 'express';
import { statusCode } from '../../../config/status-code';
import { prisma } from '../../../utils/prismaClient';

export const logoutService = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  console.log('refresh token: ', cookies);

  if (!cookies?.refreshToken)
    return res.sendStatus(statusCode.success.noContent);

  const refreshTokenCookied = cookies.refreshToken;

  const user = await prisma.user.findFirst({
    where: {
      refreshTokens: { some: { token: refreshTokenCookied } },
    },
  });

  // console.log('user: ', user);

  if (!user) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.sendStatus(statusCode.success.noContent);
  }

  const t = await prisma.refreshToken.delete({
    where: {
      token: refreshTokenCookied,
    },
  });

  // console.log(t);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  return res.sendStatus(statusCode.success.noContent);
};
