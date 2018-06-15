const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userModel = require(__base + 'models/user.model.js');
const config = require(__base + 'system/config.js');

const checkUser = (req, res) => {
  // Check if the user exists.
  let field = [{"username":req.body.username}, {"email":req.body.username}];
  if(!isNaN(parseInt(req.body.username))) {
    field.push({"phone": req.body.username});
  }
  userModel.findOne({$or: field}, (err,user) => {
    if(err) {
      console.log(err)
    }
    if(!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    }
    else {
      // Check if the user is banned
      if(user.status !== -1) {
        // Check if the password is correct
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if(result) {
            // Check if the user is verified
            if(user.verified.phone || user.verified.email) {
              let data = {
                "username":user.username,
                "email":user.email,
                "level":user.level
              }
              let token = jwt.sign(data, config.details.sign, {
               expiresIn: 86400 // expires in 24 hours
              });
              res.json({"success": true, "message": 'Authenticated', "token": token});
            }
            else {
              res.json({ success: false, message: 'Account not verified.' });
            }
          }
          else {
            res.json({ success: false, message: 'Authentication failed. Wrong Password.' });
          }
        });
      }
      else {
        res.json({ success: false, message: 'Authentication failed. Account has been banned.' });
      }
    }
  });
}

module.exports = checkUser;
