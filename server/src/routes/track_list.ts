import express from 'express';

import track_list from '../responses/track_list.json';

export const trackListRouter = express.Router();

trackListRouter.get('/track_list', (_, res) => res.json(track_list));
