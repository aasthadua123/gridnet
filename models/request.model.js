const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// -1 -> Blocked
// 0 -> Pending
// 1 -> Accepted

const requestModel = new schema({
  "requester": {
    "type": mongoose.Schema.Types.ObjectId,
    "required": true
  },
  "recipient": {
    "type": mongoose.Schema.Types.ObjectId,
    "required": true
  },
  "status": {
    "type": Number,
    "required": true
  }
});

module.exports = mongoose.model('Requests', requestModel);
