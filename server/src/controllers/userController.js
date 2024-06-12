const db = require('../models/user');

const userController = {};

userController.createTable = (req, res, next) => {
  console.log("in create table controller");
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR,
      password VARCHAR
    )
    `;
  db.query(query)
    .then(result => {          
      console.log("Table created successfully");
      return next();
    })   
    .catch(err => next({log:e}));  
};

userController.addUser = (req, res, next) => {
  console.log("in add user controller");
  const { username } = req.body;
  password = "";
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;
  db.query(query, [username, password])
    .then(result => {
      console.log("User entered successfully");
      return next();
     })
    .catch(err => next(err));
};

userController.checkUser = (req, res, next) => {
  console.log("in check user controller");
  res.locals.userExists=false;
  const { username } = req.body;
  const query = `
     SELECT * FROM users WHERE username = $1
  `;
  db.query(query, [username])
    .then(result => {
      console.log("User found successfully");
      if (result.rows.length > 0) res.locals.userExists = true;
      return next();
     })
    .catch(err => next(err));
};

module.exports = userController;