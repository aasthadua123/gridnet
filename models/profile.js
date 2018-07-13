const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// 0 -> Profile Incomplete
// 1 -> Profile Complete
// 2 -> User Deactivated

const profile = new schema({
    "fullname":{
      "type": String,
      "required": true
    },
    "country": {
      "name": String,
      "code": String
    },
    "friends": [{
      "id": mongoose.Schema.Types.ObjectId,
      "since": Date,
      "relation": {
        "default": "Friend"
      }
    }],
    "status": {
      "type": Number,
      "default": 0
    }
});

module.exports = mongoose.model('profile', profile);
