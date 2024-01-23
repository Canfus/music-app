import { Router } from 'express';

import { mongoClient, getDatabase } from '../mongo';
import { USERS_COLLECTION } from '../utils';
import { User, Exception } from '../api';
import type { LoginCredentials, RegisterCredentials } from '../api';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const credentials = req.body as LoginCredentials;

  if (!credentials.username || !credentials.password) {
    const error = new Exception<LoginCredentials>({
      status: 400,
      details: {
        nonFieldErrors: ['username and password is required'],
      },
    });

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(USERS_COLLECTION);

    const user = await collection.findOne({ username: credentials.username });

    if (!user) {
      const error = new Exception<LoginCredentials>({
        status: 404,
        details: {
          fieldErrors: [{ username: 'user not found' }],
        },
      });

      return res.status(error.status).json(error);
    }

    if (
      user.username !== credentials.username ||
      user.password !== credentials.password
    ) {
      const credentialsKeys = Object.keys(
        credentials,
      ) as (keyof LoginCredentials)[];

      const error = new Exception<LoginCredentials>({
        status: 400,
        details: {
          fieldErrors: credentialsKeys
            .filter((key) => user[key] !== credentials[key])
            .map((key) => ({ [key]: `invalid ${key}` })),
        },
      });

      return res.status(error.status).json(error);
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});

authRouter.post('/register', async (req, res) => {
  const credentials = req.body as RegisterCredentials;

  if (
    !credentials.email ||
    !credentials.username ||
    !credentials.password ||
    !credentials.repeat_password
  ) {
    const error = new Exception<RegisterCredentials>({
      status: 400,
      details: {
        nonFieldErrors: ['data is required'],
      },
    });

    return res.status(error.status).json(error);
  }

  if (credentials.password !== credentials.repeat_password) {
    const error = new Exception<RegisterCredentials>({
      status: 400,
      details: {
        fieldErrors: [
          { repeat_password: "password and confirm password doesn't match" },
        ],
      },
    });

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(USERS_COLLECTION);

    const { repeat_password, ...data } = credentials;

    const user = await collection.findOne({ email: data.email });

    if (user) {
      const error = new Exception<RegisterCredentials>({
        status: 400,
        details: {
          fieldErrors: [{ username: 'user already exists' }],
        },
      });

      return res.status(error.status).json(error);
    }

    await collection.insertOne(new User(data)).then(async (user) => {
      const newUser = await collection.findOne({ _id: user.insertedId });
      return res.json(newUser);
    });
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});
