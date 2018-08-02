const moment = require('moment');

const userModel = require(__base + 'models/user.js');

const logout = (req, res) => {
  userModel.findOne({"username":req.info.username}, (err,user) => {
    if(err) {
      res.json({
        success: false,
        msg: err.message
      });
    }
    else {
      userModel.findOneAndUpdate(
      {"username": user.username}, 
      { $push:{"lastLogout":moment()} }, (err, doc) => {
        if (err) {
          res.json({
            success: false,
            msg: err.message
          });
        }
        else {
          res.json({
            success: true, 
            msg: 'Logged Out !'
          });
        }
      });
    }
  });
}

module.exports = logout;
