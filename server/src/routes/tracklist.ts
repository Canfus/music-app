import { Router } from 'express';

import { mongoClient, getDatabase, getObjectId } from '../mongo';
import { TRACKLIST_COLLECTION } from '../utils';
import type { Error } from '../api';

export const tracklistRouter = Router();

tracklistRouter.get('/tracklist', async (_, res) => {
  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(TRACKLIST_COLLECTION);

    const tracklist = await collection.find({}).toArray();

    if (!tracklist) {
      const error: Error = {
        status: 404,
        message: {
          customError: 'tracklist is empty',
          fieldErrors: [],
        },
      };

      return res.status(error.status).json(error);
    }

    return res.json(tracklist);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});

tracklistRouter.get('/tracklist/:trackId', async (req, res) => {
  const { trackId } = req.params;

  if (trackId.length !== 24) {
    const error: Error = {
      status: 400,
      message: {
        customError: 'invalid trackId',
        fieldErrors: [],
      },
    };

    return res.status(error.status).json(error);
  }

  if (!trackId) {
    const error: Error = {
      status: 400,
      message: {
        customError: 'trackId is required',
        fieldErrors: [],
      },
    };

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(TRACKLIST_COLLECTION);

    const track = await collection.findOne({ _id: getObjectId(trackId) });

    if (!track) {
      const error: Error = {
        status: 404,
        message: {
          customError: 'track not found',
          fieldErrors: [],
        },
      };

      return res.status(error.status).json(error);
    }

    return res.json(track);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});
