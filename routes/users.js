var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_REMOTE
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
        // res.render('./usrhome', {
        //   linkHome: '/usrhome',
        //   linkApt: '/aptSch',
        //   linkPref: '/pref',
        //   linkLogout: '/logout'
        // });
        // home page after login in/registration
        var userID = 1;
        var aptsStr = '';
        var aptsIStr = '';
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var mapIdx = 0;


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
            //console.log('outside of init' + row.loc_lat);
            if(row.loc_lat === null || row.loc_lng === null)
            {
              row.loc_lat = 40.5592;
              row.loc_lng = -105.0781;
            }

            htmlStr +=
              //'<div class="col-md-12 aptHeaderL">'+ row.start_datetime + '</div>' +
              '<div class="col-md-12 CC'+row.creator_confirm+' IC'+row.invite_confirm+' aptHeader '+aptHeader+'">'+
              '<div class="col-md-4">'+row.start_datetime+'</div>'+
              '<div class="col-md-4">'+ row.username + '</div>'+
              '<div class="col-md-4">'+ row.address + '</div>'+
              //'<div class="col-md-12" id="map">' + '</div>' +

              '</div>' +
              '<div class = "row moreInfo" style="display: none;">'+
                //'<div class="col-md-1">'+'</div>'+
                '<div class="col-md-12">'+row.description+'</div>' +
                '<div class="col-md-12" lat="'+row.loc_lat+'" lng="'+row.loc_lng+'" id="map'+mapIdx+'">'+'</div>' +
              '</div>'
            ;
            mapIdx++;
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
          'start_datetime','asc'
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
             'start_datetime','asc'
            ).then(function(result) {
              aptsIStr = getAptsList(result);

              res.render('./usrhome', {
                linkHome: '/users/usrhome',
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
                linkHome: '/users/usrhome',
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
            linkHome: '/users/usrhome',
            linkApt: '/aptSch',
            linkPref: '/pref',
            linkLogout: '/logout',
            yourApts: aptsStr,
            invApts: aptsIStr
          });
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
