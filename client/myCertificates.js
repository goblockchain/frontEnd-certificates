Template.myCertificates.helpers({
    myCertificates() {
        return Session.get("certificates");
    },
    truncate(address) {
        return(address.substr(0,8)+" ... "+address.substr(address.length - 6,6))
    },
    name(data) {
        return data[1]
    }
});

Template.myCertificates.onCreated(function () {

    this.subscribe('templates');

    Session.set("certificates", [])
});

Template.myCertificates.events({
    'click .certificate-card' (event, instance) {
        event.preventDefault();
        Router.go("/certificate/" + this.certificateHash);
    },
})

Template.myCertificates.onRendered(function () {

    abiDecoder.addABI(certificateContractJson.abi);

    // Get printed certificates
    var certificates = certificateContract.logPrintedCertificate({ownerAddress: ethereum.selectedAddress}, {
        fromBlock: FROM_BLOCK,
        toBlock: 'latest',
        topics: [null, null, null, null, null, null, ethereum.selectedAddress] // need to index the field in the event
    });

    certificates.watch(function (error, result) {

        if (!error) {
            let data = result

            accessControlContract.institutions.call(data.args.institution, function (error, result) {
                if (result && (Session.get("currentInstitution") ? (Session.get("currentInstitution") == result[1]) : true)) {
                    certificateContract.certificates.call(data.args.certificateHash,
                        function (error, cert) {
                            data.args.institutionData = result
                            if (data.args.ownerAddress == ethereum.selectedAddress) {
                                var certs = Session.get("certificates")
                                certs.push(data.args)
                                Session.set("certificates", certs)
                            }
                        })
                }
            });

        } else {
            console.log(error);
        }
    });


});