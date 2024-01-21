import { Router } from 'express';

import { mongoClient, getDatabase } from '../mongo';
import { USERS_COLLECTION } from '../utils';
import { User } from '../api';
import type { Error, LoginCredentials, RegisterCredentials } from '../api';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const credentials = req.body as LoginCredentials;

  if (!credentials.username || !credentials.password) {
    const error: Error = {
      status: 400,
      message: {
        customError: 'email and password is required',
        fieldErrors: [],
      },
    };

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(USERS_COLLECTION);

    const user = await collection.findOne({ username: credentials.username });

    if (!user) {
      const error: Error = {
        status: 404,
        message: {
          fieldErrors: [{ email: 'user not found' }],
        },
      };

      return res.status(error.status).json(error);
    }

    if (
      user.username !== credentials.username ||
      user.password !== credentials.password
    ) {
      const credentialsKeys = Object.keys(
        credentials,
      ) as (keyof typeof credentials)[];

      const error: Error = {
        status: 400,
        message: {
          fieldErrors: credentialsKeys
            .filter((key) => user[key] !== credentials[key])
            .map((key) => ({ [key]: `invalid ${key}` })),
        },
      };

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
    const error: Error = {
      status: 400,
      message: {
        customError: 'data is required',
        fieldErrors: [],
      },
    };

    return res.status(error.status).json(error);
  }

  if (credentials.password !== credentials.repeat_password) {
    const error: Error = {
      status: 400,
      message: {
        customError: "password and confirm password doesn't match",
        fieldErrors: [],
      },
    };

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(USERS_COLLECTION);

    const { repeat_password, ...data } = credentials;

    const user = await collection.findOne({ email: data.email });

    if (user) {
      const error: Error = {
        status: 400,
        message: {
          customError: 'user already exists',
          fieldErrors: [],
        },
      };

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
