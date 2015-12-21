var express = require('express');
var router = express.Router();
var account = require('../local_modules/accounts');
var knex = require('knex')({
  client: 'pg', //we will be using pg to connect to postgres
  connection: {
    host: 'gschool.ddns.net', //localhost server
    port: 2200, //default pg server port
    user: 'gschool', //your username
    password: 'gschool123',
    database: 'ketchup' //yourdatabase name
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
// landing page

  res.render('index', { title: 'Express' });
});

router.get('/example_query', function(req, res, next) {
  //example of querying Micah's database using knex
  var ketchupUsers = function(){
     return  knex('users');
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

router.post('/', function(req, res, next){
  // for login or registration
  var input = req.body.textarea;
});

router.get('/login', function(req, res, next){
  // for login or registration page
});

router.post('/login', function(req, res, next){
  // for login or registration page
  if (account.compareCredentials()) {
    //authorize user
  }
});

router.get('/signup', function(req, res, next){
  // for login or registration page
  res.send();
});

router.post('/signup', function(req, res, next){
  // for login or registration page
  var userSubmission = req.body;
  res.send(account().createAccount(res, userSubmission));
});

router.get('/home', function(req, res, next){
// home page after login in/registration
});

router.get('/pref', function(req, res, next){
// preferences set up
});

router.get('/apt', function(req, res, next){
  // appoint set up
  res.render('index', { title: 'Express' });
});

router.post('/apt', function(req, res, next){
// appoint set up
});


module.exports = router;
