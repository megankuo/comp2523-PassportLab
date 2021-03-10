module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/login');
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  },
  isAdmin: function (req, res, next) {
    if (!req.user) {
      res.redirect('/auth/login');
    }
    if (req.user.isAdmin) {
      console.log('session user is admin');
      return next();
    }
    res.redirect('/');
  },
};
