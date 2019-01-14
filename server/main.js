import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
});

Meteor.methods({
    'uploadPic' (file, institution, address) {

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

    }
});


Meteor.publish('templates', function () {
    return Templates.find({});
});
