import { Router } from 'express';

import { mongoClient, getDatabase, getObjectId } from '../mongo';
import { PLAYLISTS_COLLECTION } from '../utils';
import { Exception } from '../api';

export const playlistsRouter = Router();

playlistsRouter.get('/playlists', async (_, res) => {
  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(PLAYLISTS_COLLECTION);

    const playlists = await collection.find({}).toArray();

    if (!playlists) {
      const error = new Exception({
        status: 404,
        details: {
          nonFieldErrors: ['playlists is empty'],
        },
      });

      return res.status(error.status).json(error);
    }

    return res.json(playlists);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});

playlistsRouter.get('/playlists/:playlistId', async (req, res) => {
  const { playlistId } = req.params;

  if (playlistId.length !== 24) {
    const error = new Exception({
      status: 400,
      details: {
        nonFieldErrors: ['invalid playlistId'],
      },
    });

    return res.status(error.status).json(error);
  }

  if (!playlistId) {
    const error = new Exception({
      status: 400,
      details: {
        nonFieldErrors: ['playlistId is required'],
      },
    });

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(PLAYLISTS_COLLECTION);

    const playlist = await collection.findOne({ _id: getObjectId(playlistId) });

    if (!playlist) {
      const error = new Exception({
        status: 404,
        details: {
          nonFieldErrors: ['playlist not found'],
        },
      });

      return res.status(error.status).json(error);
    }

    return res.json(playlist);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});
