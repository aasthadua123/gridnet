const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// -1 -> Account is Blocked
// 0 -> Account Not Active
// 1 -> Account is Active

const user = new schema({
    "username":{
      "type": String,
      "required": true
    },
    "email":{
      "type": String,
      "required": true
    },
    "phone": {
      "type": Number,
      "required": true
    },
    "password": {
      "type": String,
      "required": true
    },
    "verified": {
      "phone": {
        "type": Boolean,
        "default": false
      },
      "email": {
        "type": Boolean,
        "default": false
      }
    },
    "code": {
      "phone": Number,
      "email": String
    },
    "level": {
      "type": Number,
      "default": 1
    },
    "status": {
      "type": Number,
      "default": 0
    }
});

module.exports = mongoose.model('user', user);
