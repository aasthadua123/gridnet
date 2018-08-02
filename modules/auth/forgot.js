const checkDetails = require(__base + 'models/user.js');

const code = require(__base + 'modules/misc/rand')("reset");

const forgot = (req, res) => {
    let email = req.body.email;

    checkDetails.findOne({"email":email}, (err, user) => {
      if(err) {
        res.json({
          success: false,
          msg: err.message
        })
      } 
      else {
        if (!user) {
          res.json({ 
            success: false, 
            msg: 'User not found.' 
          });
        } 
        else {
          checkDetails.findOneAndUpdate({"username": user.username}, {$set:{"code.reset":code}}, (err, doc) => {
            if(err){
              res.json({
                success: false,
                msg: err.message
              });
            }
            else {
              // Send Email with the generated link.
              res.json({ 
                success: true, 
                msg: 'Reset link sent.'
              });
            }
          });
        }
      }
    });
  }


module.exports = forgot;
