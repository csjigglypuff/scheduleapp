const db = require('../models/user');

const authController = {};

authController.authenticateCookie = (req, res, next) => {
	const userId = req.cookies.user_id;

	if (!userId) {
		return res.status(401).send('Access denied');
	}

	req.user = { id: userId };
	next();
};

module.exports = authController;
