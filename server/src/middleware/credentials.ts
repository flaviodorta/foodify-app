import { NextFunction, Request, Response } from 'express';
import { allowedOrigins } from '../config/allowed-origins';

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  next();
};
