const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { MemoryStore } = require('express-session');
const session = require('express-session');
const path = require('path');
const port = process.env.port || 8000;
const result = require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require('./middleware/passport');
const { connect } = require('./routes/authRoute');
const authRoute = require('./routes/authRoute');
const indexRoute = require('./routes/indexRoute');

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// this is stuff happening under the hood
app.use((req, res, next) => {
  console.log(`--------------User details are: -------------`);
  console.log(req.user);
  console.log(
    'All active session IDs: ' + Object.keys(JSON.parse(JSON.stringify(req.sessionStore.sessions)))
  );
  console.log('Entire session object:');
  console.log(req.session);
  console.log(`Session details are: `);
  console.log(req.session.passport);
  console.log(req.sessionID);
  next();
});

app.use('/', indexRoute);
app.use('/auth', authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
