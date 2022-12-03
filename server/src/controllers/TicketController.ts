import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TicketController {
  async show(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);

      const user = await prisma.user.findUnique({
        select: {
          tickets: true,
        },
        where: {
          id: userId,
        },
      });

      if (user) {
        return response.status(200).json({
          tickets: user.tickets,
        });
      } else {
        return response.status(404).json({ message: 'User not found.' });
      }
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);
      const body = request.body;

      const user = await prisma.user.update({
        data: {
          tickets: body.tickets,
        },
        select: {
          tickets: true,
        },
        where: {
          id: userId,
        },
      });

      return response.status(200).json({
        tickets: user.tickets,
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }
}

export default TicketController;
