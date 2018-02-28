import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.admin.events({
  'click .user-address' (event, instance) {
    event.preventDefault();
    window.open("https://etherscan.io/address/" + event.target.innerHTML);
  },
  'click .btn-revoke-access' (event, instance) {
    event.preventDefault();

    var myAddress = web3js.eth.coinbase

    if (!myAddress) {
      alert("Você não está usando um browser compatível com o Ethereum. Instale o Metamask no seu browser de preferência para poder enviar transações.");
      return;
    }

    var transactionObject = {
      from: myAddress,
      gas: 900000,
      gasPrice: 1000000000
    };

    echosContract.revokeAccess.sendTransaction(event.target.id, event.target.name, transactionObject, (error, transaction) => {

      // send email
      if (!error) {
        var sent = false;
        // get transaction result 
        console.log(transaction);
      } else
        console.log(error)
    });

  },
  'click #send-invalid' (event, instance) {
    event.preventDefault();

    var myAddress = web3js.eth.coinbase

    if (!myAddress) {
      alert("Você não está usando um browser compatível com o Ethereum. Instale o Metamask no seu browser de preferência para poder enviar transações.");
      return;
    }

    var transactionObject = {
      from: myAddress,
      gas: 900000,
      gasPrice: 1000000000
    };

    echosContract.invalidateCertificate.sendTransaction(document.getElementById("certificate-address").value, transactionObject, (error, transaction) => {

      // send email
      if (!error) {
        var sent = false;
        // get transaction result 
        console.log(transaction);
      } else
        console.log(error)
    });

  },
  'click #send-grant-access' (event, instance) {
    event.preventDefault();

    var myAddress = web3js.eth.coinbase

    if (!myAddress) {
      alert("Você não está usando um browser compatível com o Ethereum. Instale o Metamask no seu browser de preferência para poder enviar transações.");
      return;
    }

    var transactionObject = {
      from: myAddress,
      gas: 900000,
      gasPrice: 1000000000
    };

    echosContract.grantAccess.sendTransaction(document.getElementById("user-address").value, document.getElementById("access-right").value, transactionObject, (error, transaction) => {

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
    web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"));
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
      "<span id='" + data[0] + data[1].toString() + "'><i class='fa fa-spinner fa-pulse'></i><span>"
    ]).draw();
  }

  function updateUserRights(user, accessRight) {
    echosContract.hasAccess.call(user, accessRight, function (error, result) {
      if (result)
        document.getElementById(user + accessRight).innerHTML = "sim <button id='" + user + "' name='" + accessRight + "' class='btn btn-danger pull-right btn-xs btn-revoke-access'>Revogar</button>";
      else
        document.getElementById(user + accessRight).textContent = "não";
    });
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
      updateUserRights(result.args.user, result.args.access.toString(10));

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
