const jsonServer = require('json-server');

const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const playlistsRouter = jsonServer.router('./database/db.json');
const usersRouter = jsonServer.router('./database/users.json');
const tracklistRouter = jsonServer.router('./database/tracklist.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/dislike', (req, res) => {
  const { user_id, track_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      error: 'user id is required',
    });
  }

  if (!track_id) {
    return res.status(400).json({
      error: 'track id is required',
    });
  }

  const user = usersRouter.db.get('users').find({ id: user_id });

  const userPlaylist = user.get('playlist[0].music_list');
  const playlistTrackIndex = userPlaylist.indexOf(track_id);

  if (playlistTrackIndex > -1) {
    userPlaylist.splice(playlistTrackIndex, 1).write();
  }

  return res.json({
    message: 'success',
  });
});

server.post('/like', (req, res) => {
  const { user_id, track_id } = req.body;

  if (!user_id) {
    return res.status(400).json({
      error: 'user id is required',
    });
  }

  if (!track_id) {
    return res.status(400).json({
      error: 'track id is required',
    });
  }

  const user = usersRouter.db.get('users').find({ id: user_id });

  const userPlaylist = user.get('playlist[0].music_list');
  const playlistTrackIndex = userPlaylist.indexOf(track_id);

  if (playlistTrackIndex < 1) {
    userPlaylist.push(track_id).write();
  }

  return res.json({
    message: 'success',
  });
});

server.get('/playlists', (req, res) => {
  const { user_id } = req.query;

  const { tracklist } = tracklistRouter.db.getState();
  const { playlists } = playlistsRouter.db.getState();
  const user = usersRouter.db
    .getState()
    .users.find((user) => user.id === Number(user_id));

  const response = playlists.map((playlist) => ({
    ...playlist,
    music_list: playlist.music_list.map((trackId) => {
      for (let i = 0; i < tracklist.length; i += 1) {
        const track = tracklist[i];

        if (track.id === trackId) {
          return {
            ...track,
            favorite: Boolean(
              user?.playlist[0].music_list.find(
                (trackId) => trackId === track.id,
              ),
            ),
          };
        }
      }
    }),
  }));

  return res.json(response);
});

server.post('/register', (req, res) => {
  const { username, email, password, repeat_password } = req.body;

  if (!username) {
    return res.status(400).json({
      username: 'Username is required',
    });
  }

  if (!email) {
    return res.status(400).json({
      email: 'Email is required',
    });
  }

  if (password !== repeat_password) {
    return res.status(400).json({
      repeat_password: "Password doesn't match",
    });
  }

  if (usersRouter.db.get('users').find({ username }).value()) {
    return res.status(400).json({
      username: 'User is already exists',
    });
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
    playlist: [
      {
        id: 1,
        title: 'Избранное',
        photo:
          'https://images.unsplash.com/photo-1644664477908-f8c4b1d215c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
        music_list: [],
      },
    ],
  };

  usersRouter.db.get('users').push(newUser).write();

  // here we return user without password for security
  const { password: pswd, ...userReturn } = newUser;

  return res.status(200).json({
    user: userReturn,
  });
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = usersRouter.db.get('users').find({ username }).value();

  if (!user) {
    return res.status(404).json({
      error: "User doesn't exist",
    });
  }

  if (user.password !== password) {
    return res.status(400).json({
      error: 'Invalid login or password',
    });
  }

  return res.json(user);
});

server.use(playlistsRouter);
server.use(usersRouter);

server.listen(5002, () => {
  console.log(`Server was started on port ${5002}`);
});
