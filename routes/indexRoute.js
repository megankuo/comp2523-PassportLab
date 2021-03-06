const express = require('express');
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require('../middleware/checkAuth');
const { connect } = require('./authRoute');

//---------- Welcome Route -----------//
// localhost:8081
router.get('/', (req, res) => {
  res.send('welcome');
});

//---------- Dashboard Route -----------//
// localhost:8081/dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.user,
  });
});

//---------- Secret Admin Route -----------//
// localhost:8081/admin
router.get('/admin', isAdmin, (req, res) => {
  const allSessions = req.sessionStore.sessions;
  // console.log(allSessions);
  const details = [];
//   req.sessionStore.all((error, sessions) => {
//     for (let key in sessions) {
//       details.push({
//         userID: sessions[key].passport.user,
//         sessionID: key,
//       });
// // console.log("im a looooop");
//       console.log(details);
//     }
//   });
  // const allSessions = req.sessionStore.all((err, sessions) => {return sessions});
  // console.log(allSessions);
  // details.push({
  //   userID: 10000,
  //   sessionID: 'qwerty'
  // })
  for (const sessionID in allSessions) {
    // let sessionInfo = JSON.parse(sessionID);
    let sessionInfo = JSON.parse(allSessions[sessionID]);
    // let sessionInfoObj = JSON.parse(sessionInfoStr);
    console.log(sessionInfo);
    console.log(sessionInfo.passport.user);
    // console.log(sessionInfoObj);
    details.push({
      userID: sessionInfo.passport.user,
      sessionID: sessionID,
    });
  console.log("pooooops");
  console.log(details);
  // }

  res.render('admin', { user: req.user, details });
}});

module.exports = router;
