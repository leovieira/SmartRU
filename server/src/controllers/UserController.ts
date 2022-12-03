import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import mercadopago from 'mercadopago';
import { CreateCustomerPayload } from 'mercadopago/models/customers/create-payload.model';

const prisma = new PrismaClient();
const baseUrl = process.env.BASE_URL;
const uploadsUrl = `${baseUrl}/static/uploads`;

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_TOKEN as string,
});

class UserController {
  async index(request: Request, response: Response) {
    try {
      const page = request.query.page
        ? Number.parseInt(request.query.page as any)
        : 0;
      const limit = request.query.limit
        ? Number.parseInt(request.query.limit as any)
        : 10;

      const total = await prisma.user.count();

      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          cpf: true,
          email: true,
          registry: true,
          username: true,
          profile: true,
          phone: {
            select: {
              areaCode: true,
              number: true,
              updatedAt: true,
            },
          },
          address: {
            select: {
              street: true,
              number: true,
              neighborhood: true,
              zipCode: true,
              city: true,
              state: true,
              country: true,
              updatedAt: true,
            },
          },
          tickets: true,
          mercadopagoId: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          id: 'asc',
        },
        skip: page * limit,
        take: limit,
      });

      return response.status(200).json({
        pagination: {
          page,
          limit,
          total,
        },
        results: users.map((user) => ({
          ...user,
          profile: `${uploadsUrl}/${user.profile}`,
        })),
      });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const userId = parseInt(request.params.id);

      const user = await prisma.user.findUnique({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          cpf: true,
          email: true,
          registry: true,
          username: true,
          profile: true,
          phone: {
            select: {
              areaCode: true,
              number: true,
              updatedAt: true,
            },
          },
          address: {
            select: {
              street: true,
              number: true,
              neighborhood: true,
              zipCode: true,
              city: true,
              state: true,
              country: true,
              updatedAt: true,
            },
          },
          tickets: true,
          mercadopagoId: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          id: userId,
        },
      });

      if (user) {
        return response.status(200).json({
          ...user,
          profile: `${uploadsUrl}/${user.profile}`,
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

  async create(request: Request, response: Response) {
    try {
      const body = request.body;

      const customerData: CreateCustomerPayload = {
        email: body.email,
        first_name: body.firstName,
        last_name: body.lastName,
        identification: {
          type: 'CPF',
          number: body.cpf,
        },
        phone: {
          area_code: body.phone.areaCode,
          number: body.phone.number,
        },
        address: {
          zip_code: body.address.zipCode,
          street_name: body.address.street,
          street_number: body.address.number ? body.address.number : 0,
        },
      };

      const customerResponse = await (
        await mercadopago.customers.create(customerData)
      ).response;

      const user = await prisma.user.create({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          cpf: body.cpf,
          email: body.email,
          registry: body.registry,
          username: body.username,
          password: body.password,
          profile: body.profile ? body.profile : 'profile.jpg',
          phone: {
            create: {
              areaCode: body.phone.areaCode,
              number: body.phone.number,
            },
          },
          address: {
            create: {
              street: body.address.street,
              number: body.address.number,
              neighborhood: body.address.neighborhood,
              zipCode: body.address.zipCode,
              city: body.address.city,
              state: body.address.state,
              country: body.address.country,
            },
          },
          mercadopagoId: customerResponse.id,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          cpf: true,
          email: true,
          registry: true,
          username: true,
          profile: true,
          phone: {
            select: {
              areaCode: true,
              number: true,
              updatedAt: true,
            },
          },
          address: {
            select: {
              street: true,
              number: true,
              neighborhood: true,
              zipCode: true,
              city: true,
              state: true,
              country: true,
              updatedAt: true,
            },
          },
          tickets: true,
          mercadopagoId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return response
        .status(201)
        .json({ ...user, profile: `${uploadsUrl}/${user.profile}` });
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'Oops... Something went wrong!' });
    }
  }
}

export default UserController;
