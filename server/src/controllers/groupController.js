const db = require('../models/user');

const groupController = {};

groupController.createTable = (req, res, next) => {
	// console.log("in create table controller");
	const query = `
  CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(255) UNIQUE NOT NULL
  );
  `;
	db.query(query)
		.then(result => {
			console.log('Table created successfully');
			return next();
		})
		.catch(err => next({ log: e }));
};

groupController.createMany2ManyTable = (req, res, next) => {
	// console.log("in create table controller");
	const query = `
  CREATE TABLE IF NOT EXISTS user_groups (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    group_id INT REFERENCES groups(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, group_id)
  );
  `;
	db.query(query)
		.then(result => {
			console.log('Table created successfully');
			return next();
		})
		.catch(err => next({ log: e }));
};

groupController.getUsers = (req, res, next) => {
	// console.log("in get users controller");
	const query = `
     SELECT username FROM users 
  `;
	db.query(query)
		.then(result => {
			const users = result.rows.map(row => row.username);
			res.locals.users = users;
			return next();
		})
		.catch(err => next(err));
};

// same as controller below but group_name ->name for column
groupController.addGroup = (req, res, next) => {
	const { groupName } = req.body;
	// const { groupName, users } = req.body;
	// console.log("in get users controller");
	const query = `
    INSERT INTO groups (name) 
    VALUES ($1)
    RETURNING *
  `;
	db.query(query, [groupName])
		.then(result => {
			// console.log("group entered successfully");
			return next();
		})
		.catch(err => next(err));
};
// groupController.addGroup = (req, res, next) => {
//   const { groupName } = req.body;
//   // const { groupName, users } = req.body;
//   // console.log("in get users controller");
//   const query = `
//     INSERT INTO groups (group_Name)
//     VALUES ($1)
//     RETURNING *
//   `;
//   db.query(query, [groupName])
//     .then(result => {
//       // console.log("group entered successfully");
//       return next();
//      })
//     .catch(err => next(err));
// };

groupController.addUsersToGroup = (req, res, next) => {
	const { username, groupName } = req.body;

	// Step 1: Query for user_id using the username
	const getUserIdQuery = 'SELECT id FROM users WHERE username = $1';
	const getGroupIdQuery = 'SELECT id FROM groups WHERE name = $1';

	let user_id, group_id;

	db.query(getUserIdQuery, [username])
		.then(result => {
			if (result.rows.length === 0) {
				throw new Error('User not found');
			}
			user_id = result.rows[0].id;
			return db.query(getGroupIdQuery, [groupName]);
		})
		.then(result => {
			if (result.rows.length === 0) {
				throw new Error('Group not found');
			}
			group_id = result.rows[0].id;

			// Step 2: Insert into user_groups
			const insertUserGroupQuery = `
        INSERT INTO user_groups (user_id, group_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, group_id) DO NOTHING;
      `;

			return db.query(insertUserGroupQuery, [user_id, group_id]);
		})
		.then(() => {
			console.log('User added to group set successfully');
			return next();
		})
		.catch(err => {
			console.error(err);
			next({ log: err.message || 'Internal server error' });
		});
};

groupController.getGroups = (req, res, next) => {
	const userId = req.user.id;

	if (!userId) {
		return res.status(400).send('Missing user_id');
	}

	const getGroupsQuery = `
    SELECT g.id, g.name
    FROM groups g
    JOIN user_groups ug ON g.id = ug.group_id
    WHERE ug.user_id = $1;
  `;
	console.log('userid:', userId);
	db.query(getGroupsQuery, [userId])
		.then(result => {
			if (result.rows.length === 0) {
				return res.status(404).send('No groups found for this user');
			}
			console.log('getgroups backend worked');
			res.locals.groups = result.rows;
			console.log;
			return next();
		})
		.catch(err => {
			console.error(err);
			next({ log: err.message || 'Internal server error' });
		});
};

// groupController.addUsersToGroup = (req, res, next) => {
// 	const { groupName, users } = req.body;
// 	// console.log("in get users controller");
// 	// if (!Array.isArray(users) || users.length === 0) {
// 	// 	return res.status(400).json({ message: 'Users array is required and should not be empty' });
// 	// }
// 	console.log('users: ', users);
// 	const queryUser = 'SELECT id FROM users WHERE username = $1';
// 	// const queryGroup = 'SELECT id FROM groups WHERE group_name = $1';
// 	const queryGroup = 'SELECT id FROM groups WHERE name = $1';
// 	const insertUserGroup = 'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2) ON CONFLICT DO NOTHING';

// 	// Query to get the group ID
// 	db.query(queryGroup, [groupName])
// 		.then(result => {
// 			if (result.rows.length === 0) {
// 				throw new Error('Group not found');
// 			}
// 			const groupId = result.rows[0].id;

// 			// Create an array of promises for adding each user to the group
// 			const promises = users.map(username => {
// 				return db.query(queryUser, [username]).then(result => {
// 					if (result.rows.length === 0) {
// 						throw new Error(`User not found: ${username}`);
// 					}
// 					const userId = result.rows[0].id;
// 					return db.query(insertUserGroup, [userId, groupId]);
// 				});
// 			});

// 			// Execute all promises and handle the results
// 			console.log('promises: ', promises);
// 			return Promise.all(promises);
// 		})
// 		.then(() => {
// 			res.status(200).json({ message: 'Users added to group successfully' });
// 		})
// 		.catch(err => next(err));
// };

module.exports = groupController;
