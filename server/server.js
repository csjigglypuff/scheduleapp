const express = require('express');
const passport = require('./auth');
const session = require('express-session');
require('dotenv').config();
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);

const app = express();

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
	res.redirect('http://localhost:8080/signup'); // Successful authentication, redirect home.
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.listen(3000, () => {
	console.log('Server started on http://localhost:3000');
});

// const path = require('path');
// const cors = require('cors')
// const express = require('express');

// const app = express();
// const port = 3000;

// //middleware for CORS (?)
// app.use(cors());

// //serve static files
// app.use(express.json())
// app.use(express.static(path.resolve(__dirname, '../dist')));

// module.exports = app.listen(port, () =>
// console.log('Listening on port ${port}')
// )
