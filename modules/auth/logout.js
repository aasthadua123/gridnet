const moment = require('moment');

const userModel = require(__base + 'models/user.js');

const logout = (req, res) => {
  userModel.findOne({"username":req.info.username}, (err,user) => {
    if(err) {console.log(err);}
    userModel.findOneAndUpdate({"username": user.username}, { $push:{"lastLogout":moment()} }, (err, doc) => {
      if (err) {console.log("Something wrong when updating data!");}
    });
    res.json({"success": true, "message": 'Logged Out !'});
  });
}

module.exports = logout;
