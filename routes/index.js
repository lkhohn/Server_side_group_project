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
  var userSubmission = req.body;
  knex('users').where({
    username: userSubmission.username
  }).then(function(user) {
    delete user[0].password;
    res.cookie('user_session', user[0], {signed: true});
    res.redirect('/users/usrhome/');
  }).catch(function(err) {
    console.log(err);
  });
});

router.get('/signup', function(req, res, next) {
  // for registration page
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
        knex.insert({
          username: userSubmission.username,
          password: account().hashPassword(userSubmission)
        }).into('users').then(function(success) {
          console.log(success);
          res.send('success');
        }, function(err) {
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

router.get('/logout', function(req, res){
  res.clearCookie('user_session');
  res.redirect('/');
});

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
  var userSubmission = req.body;
  var userID = 1;
  knex('appointments').where({
    //what you would like to search for
  }).then(function(users) {
    knex.insert({
      creator_id: userID,
      invite_id: 2,
      address: userSubmission.mtgAddress,
      loc_lat: userSubmission.loc_lat,
      loc_lng: userSubmission.loc_lng,
      start_datetime: userSubmission.mtgDate,
      duration: userSubmission.mtgDuration,
      description: userSubmission.mtgDesc
      // creator_confirm:
      // invite_confirm:
      // location_id:
    }).into('appointments').then(function(success) {
      // res.send('success');
      res.redirect('/usrhome');
      res.end();
    });
  });
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
