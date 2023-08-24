import { Router } from 'express';
import { loginService } from '../services/loginService';
import { logoutService } from '../services/logoutService';
import { refreshTokenService } from '../services/refreshTokenService';
import { registerService } from '../services/registerService';

export const authRoute = Router();

authRoute.post('/login', loginService);
authRoute.get('/logout', logoutService);
authRoute.post('/refresh-token', refreshTokenService);
authRoute.post('/register', registerService);
