var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./usrhome', {
    linkHome: '/usrhome',
    linkApt: '/aptSch',
    linkPref: '/pref',
    linkLogout: '/logout'
  });
});

router.get('/usrhome/', function(req, res){
  if(req.signedCookies.user_session) {
    knex('users').where('id', req.signedCookies.user_session.id).then(function(user){
      if(user) {
        res.render('./usrhome', {
          linkHome: '/usrhome',
          linkApt: '/aptSch',
          linkPref: '/pref',
          linkLogout: '/logout'
        });
      } else {
        res.status(404);
        res.json({ message: 'not found' });
      }
    }).catch(function(error){
      res.status(404);
      res.json({ message: error.message });
    });
  } else {
    res.status(401);
    res.json({ message: 'not allowed' });
  }
});

module.exports = router;
