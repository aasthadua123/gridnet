const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const config = require(__base + 'system/config');

// main work is done by this smtpTransport so at new signup the value of to toEmailAddress should be
// equal to the Users[0].email  you the know the best.

const transport = nodemailer.createTransport(smtpTransport({
    service: config.details.mail.host,
    auth: {
        user: config.details.mail.user,
        pass: config.details.mail.pass
    }
}));

const sendEMail = (address, subject, message) => {
  let mail = {
    from: mailAccountUser,
    to: address,
    subject: subject,
    text: message
  }
  transport.sendMail(mail, (error, response) => {
    if(error){
        console.log(error);
    }
    console.log("Email sent: " + response);
    transport.close();
  });
}

module.exports = sendEMail;
