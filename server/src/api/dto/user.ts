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
    id: number;
    title: string;
    photo: string;
    music_list: string[];
  }[];
}

export class User implements UserDto {
  username = '';
  email = '';
  password = '';
  playlist = [
    {
      id: 1,
      title: 'Избранное',
      photo:
        'https://images.unsplash.com/photo-1644664477908-f8c4b1d215c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
      music_list: [],
    },
  ];

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
