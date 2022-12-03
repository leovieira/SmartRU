import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AuthController {
  async login(request: Request, response: Response) {
    try {
      const body = request.body;

      const user = await prisma.user.findFirst({
        select: {
          id: true,
        },
        where: {
          AND: [
            {
              username: body.username ? body.username : '',
            },
            {
              password: body.password ? body.password : '',
            },
          ],
        },
      });

      if (user) {
        return response.status(200).json({
          id: user.id,
        });
      } else {
        return response.status(401).json({ message: 'Invalid credentials.' });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }
}

export default AuthController;
