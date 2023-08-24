import { Request, Response } from 'express';
import { prisma } from '../../../utils/prismaClient';
import { statusCode } from '../../../config/status-code';

const getAllUsers = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();

  if (!allUsers)
    return res
      .status(statusCode.success.noContent)
      .json({ message: 'No users found.' });

  return res.json(allUsers);
};

const deleteUser = async (req: Request, res: Response) => {
  if (!req?.body?.id)
    return res
      .status(statusCode.error.badRequest)
      .json({ message: 'User ID required.' });

  const userId = req.body.id;

  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user)
    return res
      .status(statusCode.success.noContent)
      .json({ message: `User ID ${userId} not found.` });

  const result = await prisma.user.delete({ where: { id: userId } });

  return res.json(result);
};

const getUserById = async (req: Request, res: Response) => {
  const userId = req?.params?.id;

  if (!userId)
    return res
      .status(statusCode.error.badRequest)
      .json({ message: 'User ID required.' });

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user)
    return res
      .status(statusCode.success.noContent)
      .json({ message: `User ID ${userId} not found` });

  return res.json(user);
};

export const usersService = { getAllUsers, deleteUser, getUserById };
