require('dotenv').load();
var express = require('express');
var router = express.Router();
var account = require('../local_modules/accounts');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_REMOTE
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
    if (!user[0]) {
      res.send('invalid username or password');
    } else {
      if (account().compareCredentials(res, userSubmission.password, user[0].password)) {
        delete user[0].password;
        res.cookie('user_session', user[0], {signed: true});
        res.redirect('/users/usrhome/');
      } else {
        res.redirect('/login');
      }
    }
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
  console.log(userSubmission);
  knex('users').where({
    //what you would like to search for
  }).then(function(users) {
    //what to do on success
    var valid = account().isValidAccount(res, userSubmission, users);
    switch (valid) {
      case 0:
        res.redirect('/signup');
        //res.send('invalid password');
        break;
      case 1:
        res.redirect('/signup');
        //res.send('invalid username');
        break;
      case 2:
        knex.insert({
          username: userSubmission.username,
          password: account().hashPassword(userSubmission)
        }).into('users').then(function(success) {
          console.log(success);
          res.redirect('/login');
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
  var userID = 1;
  var aptsStr = '';
  var aptsIStr = '';
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function getAptsList(result)
  {
    var htmlStr = '';
    htmlStr += '<div class = "row aptCollector">';
    for(var i = 0; i < result.length; i++)
    {
      var row = result[i];
      var aptHeader = 'M';
      if(row.creator_confirm > 0 && row.invite_confirm > 0){
        aptHeader = 'C';
      }else if((row.creator_confirm > 0 && row.invite_confirm <= 0) || row.creator_confirm <= 0 && row.invite_confirm > 0){
        aptHeader = 'M';
      }else if(row.creator_confirm <= 0 && row.invite_confirm <= 0){
        aptHeader = 'R';
      }
      var lbl = labels[i % labels.length];
      htmlStr +=
        //'<div class="col-md-12 aptHeaderL">'+ row.start_datetime + '</div>' +
        '<div class="col-md-12 CC'+row.creator_confirm+' IC'+row.invite_confirm+' aptHeader '+aptHeader+'">'+
        '<div class="col-md-4">'+row.start_datetime+'</div>'+
        '<div class="col-md-4">'+ row.username + '</div>'+
        '<div class="col-md-4">'+ row.address + '</div>'+
        '</div>' +
        '<div class = "row moreInfo" style="display: none;">'+
          //'<div class="col-md-1">'+'</div>'+
          '<div class="col-md-12">'+row.description+'</div>' +
          //'<div class="col-md-12" id="map">'+'</div>' +
        '</div>'
      ;
    }
    htmlStr += '</div>';
    htmlStr = htmlStr + '<div class = "row optionsBlur">'+ '</div>';

    return htmlStr;
  }

  /*building your APTS*/
  knex('appointments').innerJoin(
    'users',
    'appointments.invite_id',
    'users.id'
  ).where({
      creator_id: userID
  }).orderBy(
    'start_datetime','desc'
   ).then(function(result) {

    aptsStr = getAptsList(result);

     /*building invited APTS*/
     knex('appointments').innerJoin(
       'users',
       'appointments.creator_id',
       'users.id'
     ).where({
         invite_id: userID
     }).orderBy(
       'start_datetime','desc'
      ).then(function(result) {
        aptsIStr = getAptsList(result);

        res.render('./usrhome', {
          linkHome: '/usrhome',
          linkApt: '/aptSch',
          linkPref: '/pref',
          linkLogout: '/logout',
          yourApts: aptsStr,
          invApts: aptsIStr
        });
      }).catch(function(err) {
        //what to do on error
        console.log(err);

        res.render('./usrhome', {
          linkHome: '/usrhome',
          linkApt: '/aptSch',
          linkPref: '/pref',
          linkLogout: '/logout',
          yourApts: aptsStr,
          invApts: aptsIStr
        });
      });
  }).catch(function(err) {
    //what to do on error
    console.log(err);

    res.render('./usrhome', {
      linkHome: '/usrhome',
      linkApt: '/aptSch',
      linkPref: '/pref',
      linkLogout: '/logout',
      yourApts: aptsStr,
      invApts: aptsIStr
    });
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
