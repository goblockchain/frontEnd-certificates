import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.issuer.helpers({
    sending() {
        return Session.get("sending");
    },
    title() {
        if (Session.get("currentInstitution"))
            return Session.get("currentInstitution") + " - Emitir Certificados";
        else
            return "Emitir Certificados"
    },
    showInstitution() {
        if (Session.get("currentInstitution"))
            return "hidden"
    },
    showConfig() {
        return Session.get("currentInstitution")
    },
});

Template.issuer.onCreated(function () {

    Session.set("sending", 0)

    //  if (!Meteor.userId())
    //    Router.go("/login")

    datatables(window, $);
    datatables_bs(window, $);

});

Template.issuer.events({
    //  'click .btn-send-email' (event, instance) {
    //    event.preventDefault();
    //    if (event.target.parentElement.parentElement.parentElement.childNodes[1].innerText.length == 66)
    //      var data = [{
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[1].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[2].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[3].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[4].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.parentElement.childNodes[5].innerText
    //      }]
    //    else
    //      var data = [{
    //          value: event.target.parentElement.parentElement.childNodes[1].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[2].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[3].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[4].innerText
    //      },
    //        {
    //          value: event.target.parentElement.parentElement.childNodes[5].innerText
    //      }]
    //
    //    //    if (confirm("Reenviar o email para " + data[1].value + "?"))
    //    //      enviaEmail(data);
    //
    //  },
    'click .certificate-contract' (event, instance) {
        event.preventDefault();
        window.open(certificateURL + event.target.innerHTML);
    },
    'click #config-modal' (event, instance) {
        event.preventDefault();
        Modal.show('configModal')
    },

    'click .send-invalid' (event, instance) {
        event.preventDefault();

        var myAddress = web3js.eth.coinbase

        if (!myAddress) {
            alert("Você não está usando um browser compatível com o Ethereum. Instale o Metamask no seu browser de preferência para poder enviar transações.");
            return;
        }

        var transactionObject = {
            from: myAddress,
            gas: 900000,
            gasPrice: 3000000000
        };

        var certificate = event.target.parentElement.parentElement.parentElement.childNodes[2].innerText
        if (certificate.length != 66) return;

        certificateContract.invalidateCertificate.sendTransaction(certificate, transactionObject, (error, transaction) => {

            // send email
            if (!error) {
                var sent = false;
                // get transaction result 
                console.log(transaction);
            } else
                console.log(error)
        });

    },
});

Template.issuer.onRendered(function () {

    certificateURL = "/certificate/";

    // Data table
    $('#certificates').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json"
        },
        "order": [[0, "desc"]]
    });

    $('#printCertificateForm').show();

    abiDecoder.addABI(contractAbi);

    // table functions

    if (Router.current().params.institution) {
        certificateContract.institutions.call(Router.current().params.institution, function (error, result) {
            if (result) {
                if (result[4]) { //instituição ativa
                    Session.set("currentInstitution", result[1])
                    $("#institution").val(Router.current().params.institution)
                }
            }
        });

    }

    // append row to the HTML table
    function appendRow(data) {
        $("#certificates").DataTable().row.add([
      "<button class='btn btn-primary btn-xs btn-send-email'><i class='fa fa-send'></i></button>" + data[0],
      data[1],
      "<small><a class='certificate-contract' style='cursor: pointer;' href'#' >" + data[2] + "</a></small>",
      data[3],
      data[4],
      data[5],
      data[6],
            ((data[7]) ? "sim <button class='btn btn-danger btn-xs send-invalid'><i class='fa fa-ban'></i></button>" : "não")
    ]).draw();
    }

    // Get printed certificates
    var certificates = certificateContract.logPrintedCertificate({}, {
        fromBlock: 1600000,
        toBlock: 'latest'
    });

    certificates.watch(function (error, result) {

        if (!error) {
            let data = result

            certificateContract.institutions.call(result.args._institution, function (error, result) {
                if (result && (Session.get("currentInstitution") ? (Session.get("currentInstitution") == result[1]) : true)) {
                    certificateContract.certificates.call(data.args.contractAddress,
                        function (error, cert) {
                            appendRow([
                              data.blockNumber.toString(),
                              result[1],
                              data.args.contractAddress,
                              data.args._name,
                              data.args.email,
                              data.args._course,
                              data.args._dates,
                              cert[6]
                            ])


                        })


                }
            });

            ;

        } else {
            console.log(error);
        }
    });


});

Template.issuer.onDestroyed(function () {

    Session.set("currentInstitution", false)

});

Template.configModal.events({
    'change #fileinput': function (event, template) {
        //var files = event.target.files;
        //console.log(files[0])
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {} else {
                    var imagesURL = {
                        "image": "/cfs/files/images/" + fileObj._id
                    };
                    var CertificateTemplate = Templates.findOne({
                        address: Session.get("currentInstitution")
                    })
                    if (CertificateTemplate)
                        Templates.update(CertificateTemplate._id, {
                            $set: imagesURL
                        })
                    else
                        Templates.insert({
                            address: Session.get("currentInstitution"),
                            image: imagesURL
                        });
                }
            });

        });
    }
});

Template.configModal.helpers({
    imageUrl() {
        var certificateTemplate = Templates.findOne({
            address: Session.get("currentInstitution")
        })
        console.log(certificateTemplate)
        if (certificateTemplate)
            return certificateTemplate.image;
    },
})
