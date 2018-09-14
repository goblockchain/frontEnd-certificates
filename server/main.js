import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
});

//Accounts.validateNewUser(function (user) {
//  if (user.services.google.email.search("@echos.cc") > 0 || user.services.google.email == "ndafpi4bsp@gmail.com") {
//    return true;
//
//  }
//  throw new Meteor.Error(403, "Use o seu email @echos.cc");
//});

//process.env.MAIL_URL = "smtp://oi@echos.cc:password@smtp.gmail.com:587/";
//
Meteor.methods({
    'uploadPic' (file, institution, address) {
        // async issues in method call, research
        //accessControlContract.hasRole.call(address, institution, function (error, result) {
        //if (result) {
        var imagesURL = {
            "image": "/cfs/files/images/" + file
        };
        var CertificateTemplate = Templates.findOne({
            address: institution
        })

        if (CertificateTemplate)
            Templates.update(CertificateTemplate._id, {
                $set: imagesURL
            })
        else
            Templates.insert({
                address: institution,
                image: imagesURL
            });
        //}

        //});
    }
});


Meteor.publish('templates', function () {
    return Templates.find({});
});
