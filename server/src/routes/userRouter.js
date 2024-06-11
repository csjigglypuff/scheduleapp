const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();

// userRouter.get('/',
//     userController.createTable,
//   (req, res) => res.status(200).json({})
// );

userRouter.post('/signup',
  userController.addUser,
(req, res) => res.status(200).json({})
);

// userRouter.post('/login',
// (req, res) => res.status(200).json({})
// );

module.exports = userRouter;
