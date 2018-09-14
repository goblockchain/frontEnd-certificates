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
    },
    certificateImage() {
        image = Templates.findOne({
            address: Session.get("institution")
        })
        if (image)
            return image.image;
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

            let certificateData = result
            Session.set("institution", certificateData[2])

            accessControlContract.institutions.call(certificateData[2], function (error, institutionData) {
                if (institutionData) {
                    Session.set("valid", true)
                    //document.getElementById("diploma").src = template.image;
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
