const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userModel = require(__base + 'models/user.js');

const checkUser = (req, res) => {
  // Check if the user exists.
  let field = [
    {"username":req.body.username}, 
    {"email":req.body.username}, 
    {"phone": req.body.username}];
  userModel.findOne({$or: field}, (err,user) => {
    if(err) {
      res.json({
        success: false,
        msg: err.message
      });
    }
    else {
      if(!user) {
        res.json({ 
          success: false, 
          msg: 'Authentication failed. User not found.' 
        })
      }
      else {
        // Check if the user is banned
        if(user.status !== -1) {
          // Check if the password is correct
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              res.json({
                success: false,
                msg: err.message
              });
            }
            else {
              if(result) {
                // Check if the user is verified
                if(user.verified.phone || user.verified.email) {
                  let data = {
                    "id": user._id,
                    "username":user.username,
                    "email":user.email,
                    "level":user.level
                  }
                  let token = jwt.sign(data, req.app.get('signature'), {
                   expiresIn: 86400 // expires in 24 hours
                  });
                  
                  userModel.findOneAndUpdate({"username": user.username}, { $push:{"lastLogin":moment()} }, (err, doc) => {
                      if (err) {
                        res.json({
                          success: false,
                          msg: err.message
                        });
                      }
                      else {
                        res.json({
                          success: true, 
                          msg: 'Authenticated', 
                          token: token
                        });
                      }
                  });
                }
                else {
                  res.json({ 
                    success: false, 
                    msg: 'Account not verified.' 
                  });
                }
              }
              else {
                res.json({ 
                  success: false, 
                  msg: 'Authentication failed. Wrong Password.'
                });
              }
            }
          });
        }
        else {
          res.json({ 
            success: false, 
            msg: 'Authentication failed. Account has been banned.' 
          });
        }
      }
    }
  });
}

module.exports = checkUser;
