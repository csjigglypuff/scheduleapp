const db = require('../models/user');

const scheduleController = {};

scheduleController.createTable = (req, res, next) => {

  // const query = `
  // CREATE TABLE IF NOT EXISTS groups (
  //   id SERIAL PRIMARY KEY,
  //   group_name VARCHAR(255) UNIQUE NOT NULL
  // );
  // `
  // db.query(query)
  //   .then(result => {          
  //     console.log("Table created successfully");
  //     return next();
  //   })   
  //   .catch(err => next({log:e}));  
};


module.exports = scheduleController;