const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/user');
require('dotenv').config();
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID); // Debugging
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET); // Debugging

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const query = `SELECT * FROM users WHERE username = $1`;
        const result = await db.query(query, [profile.id]);
		console.log('google query result:', result)
        if (result.rows.length > 0) {
          return done(null, result.rows[0]);
        } else {
          const insertQuery = `
            INSERT INTO users (username, password)
            VALUES ($1, '')
            RETURNING *
          `;
          const newUser = await db.query(insertQuery, [profile.id]);
		  console.log('newUser:', newUser)
          return done(null, newUser.rows[0]);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => { 
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const result = await db.query(query, [id]);
	console.log('deserial result:', result)
    done(null, result.rows[0]);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
