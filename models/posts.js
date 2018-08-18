const mongoose = require('mongoose');
const schema = mongoose.Schema;

/* Available Statuses */
// 0 -> Visible to Friends
// 1 -> Publicly Visible
// 2 -> Privately Visible

const post = new schema({
  "author": {
    id: mongoose.Schema.Types.ObjectId,
    name: String
  },
  "content": String,
  "timestamp": Date,
  "likes": [{
    "id": mongoose.Schema.Types.ObjectId
  }],
  "dislikes": [{
    "id": mongoose.Schema.Types.ObjectId
  }],
  "comments": [{
    "commenter": mongoose.Schema.Types.ObjectId,
    "content": String,
    "name": String
  }],
  "status": {
    "type": Number,
    "default": 0
  }
});

module.exports = mongoose.model('post', post);
