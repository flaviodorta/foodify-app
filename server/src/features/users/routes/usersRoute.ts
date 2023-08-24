import { Router } from 'express';
import { usersService } from '../services/usersService';
import { verifyRoles } from '../../../middleware/verifyRoles';
import { ROLES } from '../../../config/roles-list';

export const usersRoute = Router();

usersRoute.get('/get-all', usersService.getAllUsers);
usersRoute.get(
  '/get-by-id/:id',
  verifyRoles(ROLES.admin),
  usersService.getUserById
);
usersRoute.post('/delete', verifyRoles(ROLES.admin), usersService.deleteUser);
