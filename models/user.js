const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// -1 -> Account is Blocked
// 0 -> Account Not Active
// 1 -> Account is Active

/* Available Levels */
// 1 -> User
// 5 -> Admin

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
      "type": String,
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
      "email": String,
      "reset": String
    },
    "level": {
      "type": Number,
      "default": 1
    },
    "status": {
      "type": Number,
      "default": 0
    },
    "lastLogin":[Date],
    "lastLogout":[Date]
});

module.exports = mongoose.model('user', user);
