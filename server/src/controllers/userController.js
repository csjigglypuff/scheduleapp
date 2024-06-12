const db = require('../models/user');
const bcrypt = require('bcrypt');

const userController = {};

userController.createTable = (req, res, next) => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL
    )
  `;
  db.query(query)
    .then(result => {
      return next();
    })
    .catch(err => next({ log: err }));
};

userController.addUser = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  db.query(query, [username, hashedPassword])
    .then(result => {
      return next();
    })
    .catch(err => next(err));
};

userController.checkUser = (req, res, next) => {
  const { username } = req.body;
  const query = `SELECT * FROM users WHERE username = $1`;
  db.query(query, [username])
    .then(result => {
      res.locals.userExists = result.rows.length > 0;
      return next();
    })
    .catch(err => next(err));
};

userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = $1`;
  try {
    const result = await db.query(query, [username]);
    console.log('user login result:', result)
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (user.password === '') {
        res.status(401).json({ error: 'This username is registered with Google.' });
        return;
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.locals.user = user;
        return next();
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
