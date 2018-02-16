import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.admin.events({
  'click .user-address' (event, instance) {
    event.preventDefault();
    window.open("https://rinkeby.etherscan.io/address/" + event.target.innerHTML);
  },
});

Template.admin.onRendered(function () {
  datatables(window, $);
  datatables_bs(window, $);

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
    web3js = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/kak6M2Qgf7oHycGaCI2E"));
    console.log("infura")
  }

  echosContract = web3js.eth.contract(contractAbi).at(contractAddress);

  // append row to the HTML table
  function appendRow(data) {
    var accessRight;
    if (data[1] == 1)
      accessRight = "Acesso";
    else if (data[1] == 2)
      accessRight = "Financeiro";
    else if (data[1] == 3)
      accessRight = "Certificados";
    $("#access-rights").DataTable().row.add([
      "<a class='user-address' style='cursor: pointer;' href'#' >" + data[0] + "</a>",
      accessRight,
      "<span id='" + data[0] + "'><i class='fa fa-spinner fa-pulse'></i><span>"
    ]).draw();
  }

  // Get current users
  var users = echosContract.accessGranted({}, {
    fromBlock: 1600000,
    toBlock: 'latest'
  });

  users.watch(function (error, result) {

    if (!error) {
      var data = [
        result.args.user,
        result.args.access.toString(10),
        result.blockNumber,
        result.transactionHash
      ]

      appendRow(data);

    } else {
      console.log(error);
    }
  });


  // data table
  $('#access-rights').dataTable({
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json"
    }
  });

})
