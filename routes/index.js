require('dotenv').load();
var express = require('express');
var router = express.Router();
var account = require('../local_modules/accounts');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

router.get('/example_query', function(req, res, next) {
  //example of querying Micah's database using knex
  var ketchupUsers = function() {
    return knex('users');
  };
  ketchupUsers().where({
    //what you would like to search for
  }).then(function(users) {
    //what to do on success
    res.send(users);
  }).catch(function(err) {
    //what to do on error
    console.log(err);
  });
});

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

router.post('/login', function(req, res, next) {
  // for login or registration page
  var userSubmission = req.body;
  knex('users').where({
    username: userSubmission.username
  }).then(function(password) {
    res.send(account.compareCredentials(res, userSubmission.password, password));
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/signup', function(req, res, next) {
  // for registration page
  res.render('./signup', {
    linkHome: '/index',
    linkApt: '/aptSch',
    linkProfile: '/profile',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.post('/signup', function(req, res, next) {
  // for registration page
  var userSubmission = req.body;

  // var ketchupUsers = function() {
  //   return knex('users');
  // };
  knex('users').where({
    //what you would like to search for
  }).then(function(users) {
    //what to do on success
    var valid = account().isValidAccount(res, userSubmission, users);
    switch (valid) {
      case 0:
        res.send('invalid password');
        break;
      case 1:
        res.send('invalid username');
        break;
      case 2:
        knex.insert({username: userSubmission.username, password: account().hashPassword(userSubmission)}).into('users').then(function (success) {
          console.log(success);
          res.send('success');
        }, function (err) {
          console.log(err);
          res.end(err);
        });
        break;
      default:
    }
  }).catch(function(err) {
    //what to do on error
    console.log(err);
  });
});

//{"id":1,"username":"micah.eberhard@gmail.com","password":"tempPass","salt":"1","email":"micah.eberhard@gmail.com"}

router.get('/usrhome', function(req, res, next) {
  // home page after login in/registration
  res.render('./usrhome', {
    linkHome: '/home',
    linkApt: '/apt',
    linkProfile: '/profile',
    linkPref: '/preferences',
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

router.post('/aptSch', function(req, res, next) {
  // appoint set up
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

module.exports = router;
