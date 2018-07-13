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

const addFriend = (req, res) => {
  let requester = req.info.id;
  let recipient = req.params.id;
  if( requester === recipient ) {
    res.json({
      "success": false,
      "msg": "You cannot send a friend request to yourself !"
    });
  }
  else {
    requestModel.findOne({$or:[
      {$and:[{"requester": requester}, {"recipient": recipient}]},
      {$and:[{"recipient": requester}, {"requester": recipient}]}
    ]}, (err, list) => {
          if(err) { errorHandler(err, res); }
          else {
            if(list) {
              if(list.status == -1) {
                res.json({
                  "success": false,
                  "msg": "Friend does not exist !"
                });
              }
              else if (list.status == 1) {
                res.json({
                  "success": false,
                  "msg": "This user is already your friend."
                });
              }
              else if (list.status == 2) {
                requestModel.findOneAndUpdate({"_id": list._id}, {$set:{"status":0}}, (err, data) => {
                  if(err) { errorHandler(err, res); }
                  else {
                    res.json({
                      "success": true,
                      "msg": "Request Sent !"
                    });
                  }
                });
              }
              else {
                res.json({
                  "success": false,
                  "msg": "This user already has a pending request."
                });
              }
            }
            else {
              userModel.findOne({"_id": recipient}, (err, user) => {
                if(err) { errorHandler(err, res); }
                else {
                  if(user) {
                    let request = new requestModel({
                      "requester": requester,
                      "recipient": recipient,
                      "sentOn": moment()
                    });
                    request.save((err, data) => {
                      if(err) { errorHandler(err, res); }
                      else {
                        res.json({
                          "success": true,
                          "msg": "Request Sent !"
                        });
                      }
                    });
                  }
                  else {
                    res.json({
                      "success": false,
                      "msg": "Friend does not exist !"
                    });
                  }
                }
              });
            }
          }
        });
  }
}

module.exports = addFriend;
