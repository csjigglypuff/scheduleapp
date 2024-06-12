const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const passport = require('./controllers/passportController');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../../../client/src')));
app.use(cors({origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true, cookie: { maxAge: 3600000} }));
app.use(passport.initialize());
app.use(passport.session());

const userRouter = require('./routes/userRouter');
app.use('/api/user', userRouter);
const groupRouter = require('./routes/groupRouter');
app.use('/api/group', groupRouter);
const scheduleRouter = require('./routes/scheduleRouter');
app.use('/api/schedule', scheduleRouter);
// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('http://localhost:8080/calendar');
});

app.get('/api/logout', (req, res) => {
  req.logout((err) => {
    res.clearCookie('id');
    res.clearCookie('username');
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ message: 'Failed to destroy session' });
      }
      console.log('Logged out successfully');
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../client/src/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
