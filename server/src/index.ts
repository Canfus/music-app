import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
  usersRouter,
  playlistsRouter,
  tracklistRouter,
  authRouter,
} from './routes';

const app = express();
const PORT = 5002;

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRouter);
app.use(playlistsRouter);
app.use(tracklistRouter);
app.use(authRouter);

app.all('/', (_, res) => {
  res.json({
    message: 'Server is working',
  });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
