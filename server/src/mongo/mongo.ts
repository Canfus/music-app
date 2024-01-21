import { MongoClient, ObjectId } from 'mongodb';
import type { Db } from 'mongodb';

import { DATABASE } from '../utils';

export const mongoClient = new MongoClient(
  'mongodb+srv://canfus69:RZhKOteWAbkY57Fb@music-app-cluster.5btbnzj.mongodb.net/?retryWrites=true&w=majority',
);
export const getDatabase = (): Db => mongoClient.db(DATABASE);

export const getObjectId = (id: string): ObjectId => new ObjectId(id);
