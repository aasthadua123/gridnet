const bcrypt = require('bcrypt');

const userModel = require(__base + 'models/user.js');

const reset = (req,res) => {
  let id = req.params.id;

  userModel.findOne({"code.reset":id}, (err,user) => {
    if(err) {console.log(err);}
    if(user) {
      bcrypt.hash(req.body.password, req.app.get('salt'), (err, hash) => {
        if(err) {console.log(err);}
        userModel.findOneAndUpdate({"username": user.username}, {$set:{"password":hash}, $unset:{"code.reset":1}}, {new: true}, (err, doc) => {
          if(err){console.log(err);}
            res.json({"success":true,"message":"Password changed successfully."});
        })
      })
    }
    else {
      res.json({"success":false,"message":"Wrong or expired reset code."});
    }
  });
}

module.exports = reset;
