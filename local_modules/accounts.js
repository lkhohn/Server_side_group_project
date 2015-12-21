var sha256 = require('sha256');
var bcrypt = require('bcrypt');

function account() {
  return {
    createAccount: function (res, userSubmission) {
      if (userSubmission.password.length <= 8) {
        return 'Passwords must be at least 8 characters long';
      } else if (userSubmission.password === userSubmission.confirm_password) {
        var hash = bcrypt.hashSync(sha256.x2(userSubmission.password), 11);
        return hash;
      } else {
        return 'Passwords do not match';
      }
    },
    //checks the submitted password against the matching username's stored password
    compareCredentials: function (res, userSubmission) {

    }
  };
}

module.exports = account;
