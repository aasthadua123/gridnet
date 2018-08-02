const bcrypt = require('bcrypt');

const userModel = require(__base + 'models/user.js');

const reset = (req,res) => {
  let id = req.params.id;

  userModel.findOne({"code.reset":id}, (err,user) => {
    if(err) {
      res.json({
        success: false,
        msg: err.message
      })
    }
    else {
      if(user) {
        bcrypt.hash(req.body.password, req.app.get('salt'), (err, hash) => {
          if(err) {
            res.json({
              success: false,
              msg: err.message
            });
          }
          else {
            userModel.findOneAndUpdate(
              {"username": user.username}, 
              {$set:{"password":hash}, 
              $unset:{"code.reset":1}}, {new: true}, (err, doc) => {
              if(err){
                res.json({
                  success: false,
                  msg: err.message
                });
              }
              else {
                res.json({
                  success: true,
                  msg:"Password changed successfully."
                });
              }
            })
          }
        })
      }
      else {
        res.json({
          success: false,
          msg: "Wrong or expired reset code."
        });
      }
    }
  });
}

module.exports = reset;
