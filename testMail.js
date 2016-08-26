var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport('smtps://' + process.env.GOEMAIL + ':' + process.env.GOPASS + '@smtp.gmail.com');
console.log(process.env.GOEMAIL);
console.log(process.env.GOPASS);
var mailOptions = {
    to: 'walter.kl26@gmail.com',
    from: 'passwordreset@scoreit.com',
    subject: 'ScoreIt Password Reset',
    text: 'Test'
};
smtpTransport.sendMail(mailOptions, function(err,info) {
  console.log(err);
  console.log(info);
});
