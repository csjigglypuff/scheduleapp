const db = require('../models/user');

const userController = {};

userController.createTable = (req, res, next) => {
	// console.log("in create table controller");
	const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL
    )
    `;
	db.query(query)
		.then(result => {
			// console.log("Table created successfully");
			return next();
		})
		.catch(err => next({ log: e }));
};

userController.addUser = (req, res, next) => {
	// console.log("in add user controller");
	const { username, password } = req.body;
	const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
	db.query(query, [username, password])
		.then(result => {
			// console.log("User entered successfully");
			return next();
		})
		.catch(err => next(err));
};

userController.checkUser = (req, res, next) => {
	// console.log("in check user controller");
	res.locals.userExists = false;
	const { username } = req.body;
	const query = `
     SELECT * FROM users WHERE username = $1
  `;
	db.query(query, [username])
		.then(result => {
			// console.log("User found successfully");
			if (result.rows.length > 0) res.locals.userExists = true;
			return next();
		})
		.catch(err => next(err));
};

userController.login = (req, res, next) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).send('Missing required fields');
	}

	const query = 'SELECT id, username, password FROM users WHERE username = $1';

	db.query(query, [username])
		.then(result => {
			if (result.rows.length === 0) {
				return res.status(401).send('Invalid credentials');
			}

			const user = result.rows[0];

			if (password !== user.password) {
				return res.status(401).send('Invalid credentials');
			}
			res.cookie('id', user.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
			res.cookie('username', user.username, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
			console.log('username: ', user.username);
			res.locals.user = { id: user.id, username: user.username };
			return next();
		})
		.catch(err => next({ log: err.message || 'Internal server error' }));
};

module.exports = userController;
