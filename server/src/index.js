const users = require('../database/users.json');

const jsonServer = require('json-server');

const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const playlistsRouter = jsonServer.router('./database/db.json');
const usersRouter = jsonServer.router('./database/users.json');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/register', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      error: 'Username is required',
    });
  }

  if (usersRouter.db.get('users').find({ username }).value()) {
    return res.status(400).json({
      error: 'User is already exists',
    });
  }

  const newUser = {
    id: Date.now(),
    username,
    playlist: [],
  };

  usersRouter.db.get('users').push(newUser).write();

  return res.status(200).json({
    user: newUser,
  });
});

server.post('/login', (req, res) => {
  const { username } = req.body;

  const user = usersRouter.db.get('users').find({ username }).value();

  if (!user) {
    return res.status(404).json({
      error: "User doesn't exist",
    });
  }

  return res.json(user);
});

server.use(playlistsRouter);
server.use(usersRouter);

server.listen(5002, () => {
  console.log(`Server was started on port ${5002}`);
});
