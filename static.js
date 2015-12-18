// Usage: var statics = require('statics.js');
//        var db = statics.db;
//        var dbAddress = db.address;
//        var dbPort = db.port;

var statics = {
    db:{
          address: 'localhost',
          port: '5432'
        }
};


module.exports = statics;
