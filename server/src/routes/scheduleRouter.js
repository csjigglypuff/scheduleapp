const express = require('express');

const scheduleController = require('../controllers/scheduleController');

const scheduleRouter = express.Router();


// Route to
scheduleRouter.post('/signup',

(req, res) => res.status(200).json({ })
);



module.exports = scheduleRouter;
