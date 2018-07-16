Template.certificate.helpers({
    certificateAddress() {
        return Router.current().params.certificateAddress;
    },
    invalid() {
        return Session.get("invalid");
    },
    valid() {
        return Session.get("valid");
    },
    contractAddress() {
        return contractAddress;
    }
});

Template.certificate.events({
    'click #printPDF' (event, instance) {
        html2canvas(window.document.getElementById("certificate"), {
            scale: 2
        }).then(function (canvas) {
            var a = document.createElement('a');
            // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            a.download = 'Bizancio - Certificado.png';
            a.click();
        });
    },
})

Template.certificate.onCreated(function () {
    this.subscribe('templates');

    // get certificate data
    certificateContract.certificates.call(Router.current().params.certificateAddress, function (error, result) {
        if (!error) {
            if (result[6] == false) {
                Session.set("invalid", true)
                return;
            }
            let template = Templates.find({}).fetch()
            //                Templates.findOne({
            //                address: result[2]
            //            })
            console.log(template)

            let certificateData = result

            certificateContract.institutions.call(certificateData[2], function (error, institutionData) {
                if (institutionData) {
                    Session.set("valid", true)
                    document.getElementById("diploma").src = template.image;
                    document.getElementById("name").textContent = certificateData[0];
                    document.getElementById("course").textContent = certificateData[3];
                    //document.getElementById("institution").textContent = institutionData[1];
                    document.getElementById("hours").textContent = certificateData[5].c[0];
                    document.getElementById("name-professor").textContent = certificateData[7];
                    document.getElementById("address-professor").textContent = certificateData[8];
                    document.getElementById("dates").textContent = certificateData[4];
                }
            });


        } else
            Session.set("invalid", true)
    });
});
