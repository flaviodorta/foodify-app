import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../utils/validateEnv';
import { statusCode } from '../config/status-code';

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies?.accessToken;

  jwt.verify(
    accessToken,
    env.ACCESS_TOKEN_SECRET,
    (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) console.log(err);
      if (err || !decoded.email || !decoded.roles)
        return res.sendStatus(statusCode.error.forbidden);

      req.email = decoded.email;
      req.roles = decoded.roles;

      next();
    }
  );
};
