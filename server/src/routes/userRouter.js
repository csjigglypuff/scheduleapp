const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

// Route to create the users table
userRouter.get('/createtable', userController.createTable, (req, res) => res.status(200).json({ message: 'Table created successfully' }));

// Route to sign up a new user
userRouter.post('/signup', userController.addUser, (req, res) => res.status(200).json({ message: 'User created successfully' }));

userRouter.post('/checkuser', userController.checkUser, (req, res) => res.status(200).json(res.locals.userExists));

userRouter.post('/login', userController.login, (req, res) => res.status(200).json(res.locals.userExists));


module.exports = userRouter;
