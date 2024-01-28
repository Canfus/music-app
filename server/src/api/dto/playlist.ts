import { ObjectId } from 'mongodb';

export interface PlaylistDto {
  _id: ObjectId;
  key: string;
  title: string;
  photo: string;
  music_list: string[];
  author: string;
}

export class Playlist implements PlaylistDto {
  _id = new ObjectId();
  key = 'favorite';
  title = '';
  photo = '';
  music_list = [];
  author = '';

  constructor({
    key,
    photo,
    author,
    title,
  }: Partial<Omit<PlaylistDto, '_id' | 'music_list'>>) {
    this.key = key || 'favorite';
    this.photo =
      photo ||
      'https://images.unsplash.com/photo-1644664477908-f8c4b1d215c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80';
    this.author = author || '';
    this.title = title || 'Избранное';
  }
}
