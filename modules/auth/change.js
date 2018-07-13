const bcrypt = require('bcrypt');

const userModel = require(__base + 'models/user.js');

const change = (req,res) => {
  userModel.findOne({$or: [{"username":req.info.username}, {"email":req.info.username}, {"phone":req.info.username}]}, (err,user) => {
    if(err) {console.log(err);}
    if(user) {
      if(req.body.newPassword === req.body.oldPassword) {
        res.json({"success":false, "message":"Old password and new password cannot be the same."});
      }
      else {
        bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
          if(err) {console.log(err);}
          if(result) {
            bcrypt.hash(req.body.newPassword, req.app.get('salt'), (err, hash) => {
              if(err) {console.log(err);}
              userModel.findOneAndUpdate({"username": user.username}, {$set:{"password":hash}}, {new: true}, (err, doc) => {
                if(err){console.log(err);}
                res.json({"success":true,"message":"Password changed successfully."});
              });
            });
          }
          else {
            res.json({"success":false,"message":"Old password does not match records."});
          }
        });
      }
    }
  })
}

module.exports = change;
