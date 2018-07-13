const checkDetails = require(__base + 'models/user.js');

const code = require(__base + 'modules/misc/rand')("reset");

const forgot = (req, res) => {
    let email = req.body.email;

    checkDetails.findOne({"email":email}, (err, user) => {
      if (!user) {
        res.json({ success: false, message: 'User not found.' });
      }
      else {
        checkDetails.findOneAndUpdate({"username": user.username}, {$set:{"code.reset":code}}, (err, doc) => {
          if(err){console.log(err);}

          // Send Email with the generated link.
          res.json({ success: true, message: 'Reset link sent.', code: code });
        });
      }
    });
}

module.exports = forgot;
