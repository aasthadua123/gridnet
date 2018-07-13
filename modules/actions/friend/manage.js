const moment = require('moment');

const requestModel = require(__base + 'models/request');
const userModel = require(__base + 'models/user');

const errorHandler = (err, res) => {
  res.json({
    "success": false,
    "msg": "There is some error.",
    "error": err.message
  });
}

const manageFriend = (req, res) => {
  let type = req.params.type;
  let friend = req.params.id;
  switch(type) {
    case 'delete':
    deleteRequest(friend);
    break;
    case 'accept':
    acceptRequest(friend);
    break;
    case 'unfriend':
    unfriendFriend(friend);
    break;
    case 'block':
    blockPerson(friend);
    break;
    default:
      res.json({
        "success": false,
        "msg": "Invalid Option."
      });
      break;
  }
  const acceptRequest = (id) => {
    res.send('Accept'+id);
  }

  const deleteRequest = (id) => {
    res.send('Delete'+id);
  }

  const unfriendFriend = (id) => {
    res.send('Unfriend'+id)
  }

  const blockPerson = (id) => {
    res.send('Block'+id);
  }
}

module.exports = manageFriend;
