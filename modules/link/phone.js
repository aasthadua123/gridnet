let num = req.body.phone
let chk = num.split("")
var compNum = num;
if(chk[0] != "+") {
  var compNum = "+91"+num
}
let message = 'Your OTP is : '+otp
