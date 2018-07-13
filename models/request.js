const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// -1 -> Blocled
// 0 -> Pending
// 1 -> Accepted
// 2 -> Deleted

const requestModel = new schema({
  "requester": {
    "type": mongoose.Schema.Types.ObjectId,
    "required": true
  },
  "recipient": {
    "type": mongoose.Schema.Types.ObjectId,
    "required": true
  },
  "sentOn": Date,
  "status": {
    "type": Number,
    "default": 0
  }
});

module.exports = mongoose.model('Requests', requestModel);
