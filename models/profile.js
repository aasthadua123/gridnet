const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// 0 -> Profile Incomplete
// 1 -> Profile Complete
// 2 -> User Deactivated

const profile = new schema({
  "userid": mongoose.Schema.Types.ObjectId,
  "name": {
    "type": String
  },
  "country": {
    "name": String,
    "code": String
  },
  "friends": [{
    "id": mongoose.Schema.Types.ObjectId,
    "name": String,
    "since": Date,
    "relation": {
      "type": Number,
      "default": 1
    }
  }],
  "status": {
    "type": Number,
    "default": 0
  }
});

module.exports = mongoose.model('profile', profile);
