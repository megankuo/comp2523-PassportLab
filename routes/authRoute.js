const express = require('express');
const passport = require('../middleware/passport');
const { forwardAuthenticated } = require('../middleware/checkAuth');

const router = express.Router();

// localhost:8081/auth/login
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// localhost:8081/auth/login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
  })
);

// localhost:8081/auth/logout
router.get('/logout', (req, res) => {
  req.logout(); // will destroy the current session
  res.redirect('/auth/login');
});

// github stuff
// router.get('/github', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/github', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
  })
);

module.exports = router;
