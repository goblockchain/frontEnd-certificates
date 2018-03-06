import {
  Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.validateNewUser(function (user) {
  if (user.services.google.email.search("@echos.cc") > 0 || user.services.google.email == "ndafpi4bsp@gmail.com") {
    return true;

  }
  throw new Meteor.Error(403, "Use o seu email @echos.cc");
});

process.env.MAIL_URL = "smtp://oi@echos.cc:starwars1.@smtp.gmail.com:587/";

Meteor.methods({
  'sendEmail' (to, title, msg) {
    Email.send({
      to: to,
      from: 'oi@echos.cc',
      subject: title,
      html: msg
    });
  }
});
