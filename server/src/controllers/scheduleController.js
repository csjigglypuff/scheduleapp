const db = require('../models/user');

const scheduleController = {};

// Create the table if it does not exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  Mon VARCHAR(10),
  Tues VARCHAR(10),
  Wed VARCHAR(10),
  Thu VARCHAR(10),
  Fri VARCHAR(10),
  Sat VARCHAR(10),
  Sun VARCHAR(10),
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
	const { schedule, username } = req.body; // Extract the schedule and username from the request body

	if (!schedule || !username) {
			return res.status(400).json({ message: 'Schedule and username must be provided' });
	}

	try {
			// Look up the user ID from the users table
			const userQuery = 'SELECT id FROM users WHERE username = $1';
			const userResult = await db.query(userQuery, [username]);

			if (userResult.rows.length === 0) {
					return res.status(404).json({ message: 'User not found' });
			}

			const user_id = userResult.rows[0].id;

			// Deconstruct the schedule into day keys
			const { Mon, Tues, Wed, Thu, Fri, Sat, Sun } = schedule;

			// Helper function to insert schedule times
			const insertSchedule = async (day, times) => {
					if (times && times.length > 0) {
							for (const time of times) {
									const query = `INSERT INTO schedules (${day}, user_id) VALUES ($1, $2) RETURNING *`;
									const values = [time, user_id];
									const result = await db.query(query, values);
									console.log(`Inserted schedule entry for ${day}:`, result.rows[0]);
							}
					}
			};

			// Insert schedule times for each day
			await insertSchedule('Mon', Mon);
			await insertSchedule('Tues', Tues);
			await insertSchedule('Wed', Wed);
			await insertSchedule('Thu', Thu);
			await insertSchedule('Fri', Fri);
			await insertSchedule('Sat', Sat);
			await insertSchedule('Sun', Sun);

			console.log('All schedule entries saved successfully!');
			res.locals.savedSchedule = schedule; // Save the schedule to res.locals for potential use in next middleware
			return next();
	} catch (error) {
			console.error('Error saving schedule:', error);
			return res.status(500).json({ message: 'Error saving schedule', error: error.message });
	}
};

// // Middleware to save schedule
// //given a group name return user ids
// //then given specific list of user ids, look up the entries in each column Mon, tues, wed, thu, fri, sat and sun and return an object stored in res. locals with keys matching those columns with an array of entries only if entry is the same across each user
scheduleController.getSchedule = async (req, res, next) => {
	const { groupName } = req.body;

	if (!groupName) {
			return res.status(400).json({ message: 'Group name must be provided' });
	}

	try {
			// Look up the group ID from the groups table
			const groupQuery = 'SELECT id FROM groups WHERE group_name = $1';
			const groupResult = await db.query(groupQuery, [groupName]);

			if (groupResult.rows.length === 0) {
					return res.status(404).json({ message: 'Group not found' });
			}

			const group_id = groupResult.rows[0].id;

			// Look up all user IDs in the specified group
			const userQuery = 'SELECT user_id FROM user_groups WHERE group_id = $1';
			const userResult = await db.query(userQuery, [group_id]);

			if (userResult.rows.length === 0) {
					return res.status(404).json({ message: 'No users found in the group' });
			}

			const userIds = userResult.rows.map(row => row.user_id);

			// Helper function to get common entries for each day
			const getCommonEntries = async (day) => {
					const dayQuery = `SELECT ${day}, COUNT(*) FROM schedules WHERE user_id = ANY($1::int[]) GROUP BY ${day} HAVING COUNT(*) = $2`;
					const dayResult = await db.query(dayQuery, [userIds, userIds.length]);

					return dayResult.rows.map(row => row[day]);
			};

			// Retrieve common schedule entries for each day
			const commonSchedule = {
					Mon: await getCommonEntries('Mon'),
					Tues: await getCommonEntries('Tues'),
					Wed: await getCommonEntries('Wed'),
					Thu: await getCommonEntries('Thu'),
					Fri: await getCommonEntries('Fri'),
					Sat: await getCommonEntries('Sat'),
					Sun: await getCommonEntries('Sun'),
			};

			// Store the result in res.locals
			res.locals.savedSchedule = commonSchedule;
			console.log('Common schedule entries retrieved successfully!');
			console.log(res.locals.savedSchedule);
			return next();
	} catch (error) {
			console.error('Error retrieving schedule:', error);
			return res.status(500).json({ message: 'Error retrieving schedule', error: error.message });
	}
};


module.exports = scheduleController;
