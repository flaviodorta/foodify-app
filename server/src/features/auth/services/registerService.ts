import { Request, Response } from 'express';
import { statusCode } from '../../../config/status-code';
import { prisma } from '../../../utils/prismaClient';
import bcrypt from 'bcrypt';
import { ROLES } from '../../../config/roles-list';

export const registerService = async (req: Request, res: Response) => {
  const { email, password, roles } = req.body;

  if (!email)
    return res
      .status(statusCode.error.badRequest)
      .json({ message: 'Email is required.' });

  if (!password)
    return res
      .status(statusCode.error.badRequest)
      .json({ message: 'Password is required.' });

  const duplicatedEmail = await prisma.user.findFirst({ where: { email } });

  if (duplicatedEmail) return res.sendStatus(statusCode.error.conflict);

  try {
    console.log('roles: ', roles);
    const hashedPassword = await bcrypt.hash(password as string, 10);

    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: roles ? roles : [ROLES.user],
      },
    });

    console.log(result);

    return res
      .status(statusCode.success.created)
      .json({ message: `New user ${email} created.` });
  } catch (err) {
    console.log(err);
  }
};
