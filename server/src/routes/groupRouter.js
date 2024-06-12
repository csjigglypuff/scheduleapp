const express = require('express');

const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');
const groupRouter = express.Router();

// Route to create the group table
groupRouter.get('/createtable', groupController.createTable, (req, res) => res.status(200).json({ message: 'Table created successfully' }));

// Route to create the table with many to many relationship between users and group
groupRouter.get('/create-m-2-m-table', groupController.createMany2ManyTable, (req, res) =>
	res.status(200).json({ message: 'Table created successfully' })
);

// Route to sign up a new user
groupRouter.post('/getusers', groupController.getUsers, (req, res) => res.status(200).json({ message: 'users sent successfully' }));

// // Route to add a new group
// groupRouter.post('/addgroup',
//   groupController.addGroup,
//   (req, res) => res.status(200).json(res.locals.userExists)
// );

groupRouter.post('/addgroup', groupController.addGroup, (req, res) => res.status(200).json({}));

//Route to add group to group table and then users and group names to many to many table
groupRouter.post('/adduserstogroup', /*groupController.addGroup,*/ groupController.addUsersToGroup, (req, res) => res.status(200).json({}));

groupRouter.get('/getgroups', authController.authenticateCookie, groupController.getGroups, (req, res) => res.status(200).json({}));

module.exports = groupRouter;
