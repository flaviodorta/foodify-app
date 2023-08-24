import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      email: Record<string, any>;
      roles: [string];
    }
  }
}
