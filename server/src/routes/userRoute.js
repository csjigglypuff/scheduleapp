const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');




userRouter.get('/', userController.createTable, (req, res)=> {
    const testJson = {
        message: "Hello, world!",
             };
    
   
    res.status(200).json(testJson);
})


module.exports = userRouter;