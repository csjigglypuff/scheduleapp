const express = require('express');

const groupController = require('../controllers/groupController');

const groupRouter = express.Router();

// Route to create the users table
groupRouter.get('/createtable',
  groupController.createTable,
  (req, res) => res.status(200).json({ message: 'Table created successfully'})
);

// Route to sign up a new user
groupRouter.post('/getusers',
  groupController.getUsers,
(req, res) => res.status(200).json({ message: 'User created successfully'})
);

groupRouter.post('/addgroup', 
  groupController.addGroup, 
  (req, res) => res.status(200).json(res.locals.userExists)
);

module.exports = groupRouter;
