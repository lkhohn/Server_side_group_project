var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
// landing page
  res.render('index', { title: 'Express' });

});

router.post('/', function(req, res, next){
  // for login or registration
  var input = req.body.textarea;
});

router.get('/login', function(req, res, next){
  // for login
<<<<<<< HEAD
});

router.get('/signup', function(req, res, next){
  //for the registration page
=======
>>>>>>> dev
});

router.get('/signup', function(req, res, next){
  // for registration page
});

router.get('/usrhome', function(req, res, next){
// home page after login in/registration
res.render('index', {
    linkHome:'/home',
    linkApt: '/apt',
    linkProfile: '/profile',
    linkPref:'/preferences',
    linkLogout:'/logout'
 });

});


router.get('/pref', function(req, res, next){
// preferences set up
});

router.get('/aptSch', function(req, res, next){
// appoint set up
});


module.exports = router;
