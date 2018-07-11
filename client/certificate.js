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
    // Web3 stuff

    // get certificate data
    certificateContract.certificates.call(Router.current().params.certificateAddress, function (error, result) {
        if (!error) {
            if (result[6] == false) {
                Session.set("invalid", true)
                return;
            }

            let data = result

            certificateContract.institutions.call(result[2], function (error, result) {
                if (result) {
                    Session.set("valid", true)
                    document.getElementById("diploma").src = "/template.png";
                    document.getElementById("name").textContent = data[0];
                    document.getElementById("course").textContent = data[3] + " é um curso da " + result[1] + " com duração de " + data[5].c[0] + " horas.";
                    document.getElementById("dates").textContent = "Realizado em " + data[4] + ".";
                }
            });


        } else
            Session.set("invalid", true)
    });
});
