var sha256 = require('sha256');
var bcrypt = require('bcrypt');

function accounts() {
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
    }
  };
}

module.exports = accounts;
