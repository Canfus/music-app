import { ObjectId } from 'mongodb';
import { Playlist } from '@server/api/dto/playlist';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}

export interface UserDto {
  username: string;
  email: string;
  password: string;
  playlist: {
    _id: ObjectId;
    title: string;
    photo: string;
    music_list: string[];
    author: string;
  }[];
}

export class User implements UserDto {
  username = '';
  email = '';
  password = '';
  playlist = [new Playlist({ author: this.username })];

  constructor({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
