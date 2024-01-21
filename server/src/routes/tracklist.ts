import { Router } from 'express';

import { mongoClient, getDatabase, getObjectId } from '../mongo';
import { TRACKLIST_COLLECTION } from '../utils';
import { Exception } from '../api';

export const tracklistRouter = Router();

tracklistRouter.get('/tracklist', async (_, res) => {
  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(TRACKLIST_COLLECTION);

    const tracklist = await collection.find({}).toArray();

    if (!tracklist) {
      const error = new Exception({
        status: 404,
        details: {
          nonFieldErrors: ['tracklist is empty'],
        },
      });

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
    const error = new Exception({
      status: 400,
      details: {
        nonFieldErrors: ['invalid trackId'],
      },
    });

    return res.status(error.status).json(error);
  }

  if (!trackId) {
    const error = new Exception({
      status: 400,
      details: {
        nonFieldErrors: ['trackId is required'],
      },
    });

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(TRACKLIST_COLLECTION);

    const track = await collection.findOne({ _id: getObjectId(trackId) });

    if (!track) {
      const error = new Exception({
        status: 404,
        details: {
          nonFieldErrors: ['track not found'],
        },
      });

      return res.status(error.status).json(error);
    }

    return res.json(track);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});
