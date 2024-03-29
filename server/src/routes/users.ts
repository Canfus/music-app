import { Router } from 'express';

import { mongoClient, getDatabase, getObjectId } from '../mongo';
import { USERS_COLLECTION } from '../utils';
import { Exception } from '../api';

export const usersRouter = Router();

usersRouter.get('/users', async (_, res) => {
  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(USERS_COLLECTION);

    const data = await collection.find({}).toArray();

    return res.json(data);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});

usersRouter.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  if (userId.length !== 24) {
    const error = new Exception({
      status: 400,
      details: {
        nonFieldErrors: ['invalid userId'],
      },
    });

    return res.status(error.status).json(error);
  }

  if (!userId) {
    const error = new Exception({
      status: 400,
      details: {
        nonFieldErrors: ['userId is required'],
      },
    });

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(USERS_COLLECTION);

    const user = await collection.findOne({ _id: getObjectId(userId) });

    if (!user) {
      const error = new Exception({
        status: 404,
        details: {
          nonFieldErrors: ['user not found'],
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
