var sha256 = require('sha256');
var bcrypt = require('bcrypt');

function account() {
  return {
    createAccount: function (res, userSubmission, users) {
      function isValidPassword() {
        if (userSubmission.password.length <= 8) {
          return false;
        } else if (userSubmission.password === userSubmission.confirm_password) {
          var hash = bcrypt.hashSync(sha256.x2(userSubmission.password), 11);
          return hash;
        } else {
          return false;
        }
      }

      function isUsernameUnique() {
        var unique = true;
        users.forEach(function (element, index) {
          if (userSubmission.username === element.username) {
            unique = false;
          }
        });
        return unique;
      }

      var password = isValidPassword();
      if (password) {
        if (isUsernameUnique()) {
          res.send('username is unique ');
          //add user to database
        } else {
          res.send('username is not unique');
          //show an error
        }
      } else {
        res.send('invalid password');
      }
    },
    //checks the submitted password against the matching username's stored password
    compareCredentials: function (res, userSubmission) {

    }
  };
}

module.exports = account;
