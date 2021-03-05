require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('../controllers/userController');
const localLogin = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    // check if user exists in the database
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: 'Your login details are not valid. Please try again',
        });
  }
);

const GitHubStrategy = require('passport-github2').Strategy;
const gitHubLogin = new GitHubStrategy(
  {
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: 'http://localhost:8000/auth/github/callback',
    scope: ['user:email'],
  },
  (accessToken, refreshToken, profile, done) => {
    const user = userController.findOrCreate(profile);
    // console.log(profile);
    // console.log(user);

    return user
      ? done(null, user)
      : done(null, false, {
          message: 'Your login details are not valid. Please try again',
        });
  }
);

// req.session.passport.user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// serializeUser creates -> req.sessions.passport.user = the user object retrieved from db

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: 'User not found' }, null);
  }
});

module.exports =
  // localLogin: passport.use(localLogin),
  // gitHubLogin: passport.use(gitHubLogin),
  passport.use(localLogin).use(gitHubLogin);
