var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  // landing page
  res.render('./index', {
    linkHome: '/index',
    linkApt: '/aptSch',
    linkProfile: '/profile',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.post('/', function(req, res, next) {
  // for login or registration
  var input = req.body.textarea;
});

router.get('/login', function(req, res, next) {
  // for login
  res.render('./login', {
    linkHome: '/index',
    linkApt: '/aptSch',
    linkProfile: '/profile',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.get('/signup', function(req, res, next) {
  //for the registration page
  res.render('./signup', {
    linkHome: '/index',
    linkApt: '/aptSch',
    linkProfile: '/profile',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.get('/usrhome', function(req, res, next) {
  // home page after login in/registration
  res.render('./usrhome', {
    linkHome: '/index',
    linkApt: '/aptSch',
    linkProfile: '/profile',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.get('/pref', function(req, res, next) {
  // preferences set up
  res.render('./pref', {
    linkHome: '/index',
    linkApt: '/aptSch',
    linkProfile: '/profile',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.get('/aptSch', function(req, res, next) {
  // appoint set up
  res.render('./aptSch', {
    linkHome: '/index',
    linkApt: '/aptSch',
    linkProfile: '/profile',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});


module.exports = router;
