import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.use('/static', express.static('./src/public'));

app.get('/user/:id', async (request, response) => {
  const userId = parseInt(request.params.id);

  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      registry: true,
      username: true,
      profile: true,
      tickets: true,
    },
    where: {
      id: userId,
    },
  });

  if (user) {
    return response.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      registry: user.registry,
      username: user.username,
      profile: `/static/images/${user.profile}`,
      tickets: user.tickets,
    });
  } else {
    return response.status(404).json({ message: 'User not found.' });
  }
});

app.post('/user', async (request, response) => {
  const body = request.body;

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      registry: body.registry,
      username: body.username,
      password: body.password,
      profile: body.profile, // upload image
    },
  });

  return response
    .status(201)
    .json({ ...user, profile: `/static/images/${user.profile}` });
});

app.post('/auth', async (request, response) => {
  const body = request.body;

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      registry: true,
      username: true,
      profile: true,
      tickets: true,
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
      name: user.name,
      email: user.email,
      registry: user.registry,
      username: user.username,
      profile: `/static/images/${user.profile}`,
      tickets: user.tickets,
    });
  } else {
    return response.status(401).json({ message: 'Invalid credentials.' });
  }
});

app.get('/user/:id/tickets', async (request, response) => {
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
});

app.put('/user/:id/tickets', async (request, response) => {
  const userId = parseInt(request.params.id);
  const body = request.body;

  const user = await prisma.user.update({
    data: {
      tickets: body.tickets,
    },
    where: {
      id: userId,
    },
  });

  return response.status(200).json({
    tickets: user.tickets,
  });
});

app.listen(3333);
