import { Router } from 'express';

import { mongoClient, getDatabase, getObjectId } from '../mongo';
import { PLAYLISTS_COLLECTION } from '../utils';
import { Error } from '../api';

export const playlistsRouter = Router();

playlistsRouter.get('/playlists', async (_, res) => {
  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(PLAYLISTS_COLLECTION);

    const playlists = await collection.find({}).toArray();

    if (!playlists) {
      const error: Error = {
        status: 404,
        message: {
          customError: 'playlists is empty',
          fieldErrors: [],
        },
      };

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
    const error: Error = {
      status: 400,
      message: {
        customError: 'invalid playlistId',
        fieldErrors: [],
      },
    };

    return res.status(error.status).json(error);
  }

  if (!playlistId) {
    const error: Error = {
      status: 400,
      message: {
        customError: 'playlistId is required',
        fieldErrors: [],
      },
    };

    return res.status(error.status).json(error);
  }

  try {
    await mongoClient.connect();

    const db = getDatabase();
    const collection = db.collection(PLAYLISTS_COLLECTION);

    const playlist = await collection.findOne({ _id: getObjectId(playlistId) });

    if (!playlist) {
      const error: Error = {
        status: 404,
        message: {
          customError: 'playlist not found',
          fieldErrors: [],
        },
      };

      return res.status(error.status).json(error);
    }

    return res.json(playlist);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoClient.close();
  }
});
