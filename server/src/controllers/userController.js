const db = require('../models/user');

const userController = {};

userController.createTable = (req, res, next) => {
  console.log("in route")
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
      next();
    })   
    .catch(err => next(err)); 
};

// userController.addUsers = (req, res, next) => {
//   const query = `  
//   CREATE TABLE [IF NOT EXISTS] user (
//     id INTEGER,
//     user VARCHAR
//   )`;

//   db.query(query)
//     .then(result => {          
//       console.log('Table created successfully');
//       next();
//     })   
//     .catch(err => next(err));
// }
module.exports = userController;