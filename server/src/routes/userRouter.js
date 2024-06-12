const express = require('express');
const userController = require('../controllers/userController');
const userRouter = express.Router();

// Route to create the users table
userRouter.get('/createtable', userController.createTable, (req, res) => res.status(200).json({ message: 'Table created successfully' }));

// Route to sign up a new user
userRouter.post('/signup', userController.addUser, (req, res) => res.status(200).json({ message: 'User created successfully' }));

userRouter.post('/checkuser', userController.checkUser, (req, res) => res.status(200).json(res.locals.userExists));

userRouter.post('/login', userController.login, (req, res) => {
  req.session.user = res.locals.user;
  res.status(200).json({ message: 'Login successful' });
});

userRouter.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Ensure the cookie is cleared
    res.status(200).json({ message: 'Logout successful' });
  });
});


module.exports = userRouter;
