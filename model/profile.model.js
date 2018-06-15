const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// -1 -> Profile Blocked
// 0 -> Profile Incomplete
// 1 -> Profile Complete

const profile = new schema({
    "fullname":{
      "type": String,
      "required": true
    },
    "country": String,
    "friends": [{
      "id": mongoose.Schema.Types.ObjectId,
      "name": String
    }],
    "status": Number
});

module.exports = mongoose.model('profile', profile);
