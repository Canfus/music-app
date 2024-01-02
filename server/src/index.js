const users = require('../database/users.json');

const jsonServer = require('json-server');

const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const playlistsRouter = jsonServer.router('./database/db.json');
const usersRouter = jsonServer.router('./database/users.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/register', (req, res) => {
  const { username, email, password, repeat_password } = req.body.userData;

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
