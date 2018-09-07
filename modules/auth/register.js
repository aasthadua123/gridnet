const bcrypt = require('bcrypt');
const validator = require('validator');

const config = require(__base + 'system/config.json');
const userModel = require(__base + 'models/user.js');
const profileModel = require(__base + 'models/profile.js');

// SMS Sender Module
// const sendSMS = require(__base + 'modules/comm/nexmo.js')
// Email Sender Module
const sendEmail = require(__base + 'modules/link/email.js');

// One-Time Password Generation
const otp = require(__base + 'modules/misc/rand.js');
const otp_ph = otp("phone");
const otp_em = otp("email");

// Actual Function
const register = (req, res) => {
  let success = true;
  let errors = [];
  // Validations
  // Check if email is valid
  if (!validator.isEmail(req.body.email)) {
    success = false;
    errors.push('Email is invalid.');
  }
  // Check if passwords match
  if (req.body.passEnter !== req.body.passConfirm) {
    success = false;
    errors.push('Passwords do not match.');
  }
  // Check if the user exists in the database.
  userModel.findOne({
    $or: [{
      "username": req.body.username
    }, {
      "email": req.body.email
    }, {
      "phone": req.body.phone
    }]
  }, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: err.message
      });
    } else {
      if (user) {
        success = false;
        errors.push('Account already exists.');
      }
      else {
        if (req.body.phone.split("").length > 10) {
          success = false;
          errors.push('Phone number is invalid.');
        }
        /* Store user in database */
        let User = new userModel({
          "username": req.body.username,
          "email": req.body.email,
          "phone": req.body.phone,
          "password": req.body.passEnter,
          "code": {
            "phone": otp_ph,
            "email": otp_em
          }
        });
        if (success) {
          User.save((err, data) => {
            if (err) {
              res.json({
                success: false,
                msg: err.message
              });
            } else {
              /* Profile Initialization */
              let blankProf = new profileModel({
                "userid": data._id,
                "name": req.body.name,
                "friends": []
              })
              blankProf.save((err, data) => {
                if (err) {
                  res.json({
                    success: false,
                    msg: err.message
                  });
                }
                else {
                  /* Person verification */
                  if (config.settings.verification.sms) {
                    // sendSMS(compNum, message);
                  }
                  if (config.settings.verification.email) {
                    // If emails are enabled in the configuration then send confirmation email.
                    let subject = "Friend Connect Verification";
                    let link =  "http://localhost:9500/auth/verify/email/" + req.body.username + '/' + otp_em;
                    let message = "Thank you for registering. \n Please click on the following link to activate your account. \n " + link;
                    sendEmail(req.body.email, subject, message);
                  }
                  res.json({
                    success: true,
                    msg: 'Registration Successful.'
                  });
                }
              });
            }
          });
        } else {
          res.json({
            success: false,
            msg: 'Registration failed.',
            err: errors
          });
        }
      }
    }
  });
}

module.exports = register;