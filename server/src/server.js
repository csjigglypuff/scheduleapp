// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// For Gmail Authorization
const passport = require('./controllers/passportController'); // importing our auth controller
const session = require('express-session'); // allows us the express session middleware
const cors = require('cors');
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// Gmail Authorization //
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//user route test
const userRouter = require('./routes/userRouter');
app.use('/user', userRouter);
const groupRouter = require('./routes/groupRouter');
app.use('/group', groupRouter);
const scheduleRouter = require('./routes/scheduleRouter');
app.use('/schedule', scheduleRouter);
// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
	res.redirect('http://localhost:8080/calendar');
});

app.get('/', (req, res) => {
	res.send('Hello, world!');
});

// app.post('/api/schedule', (req, res) => {
// 	// Handle POST request data
// 	res.send(req.body);
// });
// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
