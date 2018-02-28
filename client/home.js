import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.home.helpers({
  sending() {
    return Session.get("sending");
  },
});

Template.home.onCreated(function () {

  Session.set("sending", 0)

  if (!Meteor.userId())
    Router.go("/login")

  datatables(window, $);
  datatables_bs(window, $);

});

Template.home.events({
  'click .btn-send-email' (event, instance) {
    event.preventDefault();
    data = [{
        value: event.target.parentElement.parentElement.parentElement.childNodes[1].innerText
      },
      {
        value: event.target.parentElement.parentElement.parentElement.childNodes[2].innerText
      },
      {
        value: event.target.parentElement.parentElement.parentElement.childNodes[3].innerText
      },
      {
        value: event.target.parentElement.parentElement.parentElement.childNodes[4].innerText
      },
      {
        value: event.target.parentElement.parentElement.parentElement.childNodes[5].innerText
      }]

    if (confirm("Reenviar o email para " + data[1].value + "?"))
      enviaEmail(data);

  },
  'click .certificate-contract' (event, instance) {
    event.preventDefault();
    window.open(certificateURL + event.target.innerHTML);
  },
});

Template.home.onRendered(function () {

  certificateURL = "https://echos.cc/certificado/?";

  // Data table
  $('#certificates').dataTable({
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json"
    }
  });

  // Web3 stuff

  // Init web3
  var Web3 = require('web3');

  var injectedWeb3 = false;
  if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    console.log("injected web3")
    var injectedWeb3 = true;
  } else {
    //set the provider to Rinkeby/Infura, will only work for view functions
    web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"));
    console.log("infura")
  }

  if (injectedWeb3)
    $('#printCertificateForm').show();

  echosContract = web3js.eth.contract(contractAbi).at(contractAddress);
  abiDecoder.addABI(contractAbi);

  // table functions

  // append row to the HTML table
  function appendRow(data) {
    $("#certificates").DataTable().row.add([
      "<button class='btn btn-primary btn-xs btn-send-email'><i class='fa fa-send'></i></button> " + data[0],
      "<a class='certificate-contract' style='cursor: pointer;' href'#' >" + data[1] + "</a>",
      data[2],
      data[3],
      data[4],
      data[5]
    ]).draw();
  }

  // Get printed certificates
  var certificates = echosContract.logPrintedCertificate({}, {
    fromBlock: 1600000,
    toBlock: 'latest'
  });

  certificates.watch(function (error, result) {

    if (!error) {
      var data = [
        result.blockNumber.toString(),
        result.args.contractAddress,
        result.args._name,
        result.args.email,
        result.args._course,
        result.args._dates,
      ]

      appendRow(data);

    } else {
      console.log(error);
    }
  });


});
