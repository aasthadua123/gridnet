const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userModel = require(__base + 'models/user.model.js');
const config = require(__base + 'system/config.js');

// SMS Sender Module
// const sendSMS = require(__base + 'modules/comm/nexmo.js')
// Email Sender Module
const sendEmail = require(__base + 'modules/link/email.js');

// One-Time Password Generation
const otp = require(__base + 'modules/misc/rand.js');
const otp_ph = otp("phone");
const otp_em = otp("email");

// Actual Function
const register = (req,res) => {
  /* Check if passwords match */
  if(req.body.passEnter === req.body.passConfirm) {
    // Check if the user exists in the database.
    authModel.findOne({$or:[{"username":req.body.username}, {"email":req.body.email}, {"phone":req.body.phone}]},
    (err, user) => {
      if(!user) {
        // If no user found then generate the hash.
        bcrypt.hash(req.body.passEnter, config.settings.salt, (err, passHash) => {
          if(err) {
            console.log(err);
          }
          /* Store user in database */
          let User = new authModel({
            "username":req.body.username,
            "email":req.body.email,
            "phone":req.body.phone,
            "password":passHash,
            "code":{
              "phone":otp_ph,
              "email":otp_em
            }
          })
          User.save((err,data) => {
            if (err) {
              console.log(err)
            }
            /* Person verification */
            if(config.settings.verification.sms) {
              // sendSMS(compNum, message)
              console.log("Phone otp is "+otp_ph);
            }
            if(config.settings.verification.email) {
              // If emails are enabled in the configuration then send confirmation email.
              let subject = "Account activation for Gridnet."
              let link = config.settings.server.protocol+"://"+config.settings.server.host+"/auth/verify/email/"+req.body.username+'/'+otp_em
              let message = "Thank you for registering on Gridnet. \n Please click on the following link to activate your account. \n "+link
              sendEmail(req.body.email, subject, message)
            }
          });
        });
      }
      else {
          res.json({ "success": false, "message": 'Registration failed. Account already exists.' })
      }
    });
  }

  /* Passwords do not match */
  else {
    res.json({ "success": false, "message": 'Registration failed. Passwords do not match.' })
  }
}

module.exports = register;
