const db = require('../models/user');

const scheduleController = {};

// Create the table if it does not exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  day VARCHAR(10) NOT NULL,
  time_slot VARCHAR(10) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

scheduleController.createTable = async (req, res, next) => {
	try {
		await db.query(createTableQuery);
		console.log('Table "schedules" is ready.');
		next();
	} catch (error) {
		console.error('Error creating table:', error);
		res.status(500).json({ message: 'Error creating table', error: error.message });
	}
};

// Middleware to save schedule
scheduleController.saveSchedule = async (req, res, next) => {
	const { schedule, user_id } = req.body; // Extract the schedule and user_id from the request body

	if (!schedule || !user_id) {
		return res.status(400).json({ message: 'Schedule and user ID must be provided' });
	}

	try {
		// Iterate over the schedule array and insert each entry into the database
		for (const entry of schedule) {
			const { day, times } = entry;

			for (const time of times) {
				const query = 'INSERT INTO schedules (day, time_slot, user_id) VALUES ($1, $2, $3) RETURNING *';
				const values = [day, time, user_id];

				const result = await db.query(query, values);
				console.log('Inserted schedule entry:', result.rows[0]);
			}
		}

		console.log('All schedule entries saved successfully!');
		res.locals.savedSchedule = schedule; // Save the schedule to res.locals for potential use in next middleware
		return next();
	} catch (error) {
		console.error('Error saving schedule:', error);
		return res.status(500).json({ message: 'Error saving schedule', error: error.message });
	}
};

module.exports = scheduleController;
