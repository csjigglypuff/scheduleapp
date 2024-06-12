const express = require('express');

const scheduleController = require('../controllers/scheduleController');

const scheduleRouter = express.Router();

// Ensure the table is created
scheduleRouter.use(scheduleController.createTable);

// Route to handle schedule submission
scheduleRouter.post('/', scheduleController.saveSchedule, (req, res) => {
	res.status(200).json({ message: 'Schedule saved successfully', data: res.locals.savedSchedule });
});

module.exports = scheduleRouter;
