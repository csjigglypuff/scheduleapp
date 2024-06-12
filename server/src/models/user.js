const { Pool } = require('pg');

const PG_URI = 'postgres://pinbucrd:mx0LeYsKrgiZFKCb9x-SnRpXyxdOeXRi@ruby.db.elephantsql.com/pinbucrd';

// const PG_URI = 'postgresql://Coding:96818@localhost:5432/mydatabase';

const pool = new Pool({
	connectionString: PG_URI,
});

module.exports = {
	query: (text, params, callback) => {
		console.log('executed query', text);
		return pool.query(text, params, callback);
	},
};
