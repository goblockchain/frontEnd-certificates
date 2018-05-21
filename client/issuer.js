import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.issuer.helpers({
  sending() {
    return Session.get("sending");
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

  // append row to the HTML table
  function appendRow(data) {
    $("#certificates").DataTable().row.add([
      "<button class='btn btn-primary btn-xs btn-send-email'><i class='fa fa-send'></i></button> " + data[0],
      data[1],
      "<small><a class='certificate-contract' style='cursor: pointer;' href'#' >" + data[2] + "</a></small>",
      data[3],
      data[4],
      data[5],
      data[6]
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
        if (result) {
          appendRow([
              data.blockNumber.toString(),
              result[1],
              data.args.contractAddress,
              data.args._name,
              data.args.email,
              data.args._course,
              data.args._dates,
            ])

        }
      });

      ;

    } else {
      console.log(error);
    }
  });


});
