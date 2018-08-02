const bcrypt = require('bcrypt');

const userModel = require(__base + 'models/user.js');

const change = (req,res) => {
  userModel.findOne({$or: [
    {"username":req.info.username}, 
    {"email":req.info.username}, 
    {"phone":req.info.username}
  ]}, (err,user) => {

    if(err) {
      res.json({
        success: false,
        msg: err.message
      })
    }
    
    else {
      if(user) {
        if(req.body.newPassword === req.body.oldPassword) {
          res.json({
            success:false, 
            msg:"Old password and new password cannot be the same."
          });
        }
        else {
          bcrypt.compare(req.body.oldPassword, user.password, (err, result) => {
            if(err) {
              res.json({
                success: false,
                msg: err.mesage
              })
            }
            else {
              if(result) {
                bcrypt.hash(req.body.newPassword, req.app.get('salt'), (err, hash) => {
                  if(err) {
                    res.json({
                      success: false,
                      msg: err.message
                    })
                  }
                  else {
                    userModel.findOneAndUpdate(
                      {"username": user.username}, 
                      {$set:{"password":hash}}, {new: true}, (err, doc) => {
                      if(err){
                        res.json({
                          success: false,
                          msg: err.message
                        })  
                      }
                      else {
                        res.json({
                          success:true,
                          msg:"Password changed successfully."
                        });
                      }
                    });
                  }
                });
              }
              else {
                res.json({
                  success:false,
                  msg:"Old password does not match records."
                });
              }
            }
          });
        }
      }
    }   
  })
}

module.exports = change;
