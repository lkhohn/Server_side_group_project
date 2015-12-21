require('dotenv').load();
var express = require('express');
var router = express.Router();
var account = require('../local_modules/accounts');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});


var ketchupUsers = function() {
  return knex('users');
};
ketchupUsers().where({
  //what you would like to search for
}).then(function(users) {
  //what to do on success
  console.log(users);
}).catch(function(err) {
  //what to do on error
  console.log(err);
});
//console.log(knex.select('*').from('users'));

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
  res.render('./', {
    linkHome: '/',
    linkApt: '/aptSch',
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
    linkHome: '/',
    linkApt: '/aptSch',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.post('/login', function(req, res, next) {
  // for login or registration page
  if (account.compareCredentials()) {
    //authorize user
  }
});

router.get('/signup', function(req, res, next) {
  // for login or registration page
  res.render('./signup', {
    linkHome: '/',
    linkApt: '/aptSch',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.post('/signup', function(req, res, next) {
  // for registration page
  var userSubmission = req.body;
  var ketchupUsers = function() {
    return knex('users');
  };
  ketchupUsers().where({
    //what you would like to search for
  }).then(function(users) {
    //what to do on success
    account().createAccount(res, userSubmission, users);
  }).catch(function(err) {
    //what to do on error
    console.log(err);
  });
});

//{"id":1,"username":"micah.eberhard@gmail.com","password":"tempPass","salt":"1","email":"micah.eberhard@gmail.com"}

router.get('/usrhome', function(req, res, next) {
  // home page after login in/registration
  res.render('./usrhome', {
    linkHome: '/usrhome',
    linkApt: '/aptSch',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.get('/aptSch', function(req, res, next) {
  // appoint set up
  res.render('./aptSch', {
    linkHome: '/usrhome',
    linkApt: '/aptSch',
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
    linkHome: '/usrhome',
    linkApt: '/aptSch',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

module.exports = router;
