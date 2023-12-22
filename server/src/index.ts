import express from 'express';
import cors from 'cors';

import { trackListRouter } from './routes';

const app = express();
const port = 5002;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(trackListRouter);

app.all('/', (_, res) => res.send('Server is working'));

app.listen(port, () => console.log(`Server was start with port ${port}`));
