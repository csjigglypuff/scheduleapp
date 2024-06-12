const db = require('../models/user');

const groupController = {};

groupController.createTable = (req, res, next) => {
  console.log("in create table controller");
  const query = `
  CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(255) UNIQUE NOT NULL
  );
  `
  db.query(query)
    .then(result => {          
      console.log("Table created successfully");
      return next();
    })   
    .catch(err => next({log:e}));  
};

groupController.getUsers = (req, res, next) => {
  console.log("in get users controller");
  const query = `
     SELECT username FROM users 
  `;
  db.query(query)
    .then(result => {
      const users = result.rows.map(row => row.username);
      res.locals.users = users;
      return next();
     })
    .catch(err => next(err));
};

groupController.addGroup = (req, res, next) => {
  const { groupName } = req.body;
  // const { groupName, users } = req.body;
  console.log("in get users controller");
  const query = `
    INSERT INTO groups (group_Name) 
    VALUES ($1)
    RETURNING *
  `;

  db.query(query, [groupName])
    .then(result => {
      console.log("group entered successfully");
      return next();
     })
    .catch(err => next(err));
};


module.exports = groupController;