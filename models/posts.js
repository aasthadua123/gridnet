const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// 0 -> Visible to Friends
// 1 -> Publicly Visible
// 2 -> Privately Visible

const post = new schema({
  "author": String,
  "content": String,
  "timestamp": Date,
  "likes": [{
    "id": mongoose.Schema.Types.ObjectId,
    "name": String
  }],
  "dislikes": [{
    "id": mongoose.Schema.Types.ObjectId,
    "name": String
  }],
  "comments": [{
    "id": mongoose.Schema.Types.ObjectId,
    "content": String,
    "name": String
  }],
  "status": {
    "type": Number,
    "default": 1
  }
});

module.exports = mongoose.model('post', post);
