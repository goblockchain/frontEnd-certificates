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
      gasPrice: 3000000000
    };

    certificateContract.adminRemoveRole.sendTransaction(event.target.id, event.target.name, transactionObject, (error, transaction) => {

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
      gasPrice: 3000000000
    };

    certificateContract.invalidateCertificate.sendTransaction(document.getElementById("certificate-address").value, transactionObject, (error, transaction) => {

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
      gasPrice: 3000000000
    };

    certificateContract.adminAddRole.sendTransaction(document.getElementById("user-address").value, document.getElementById("access-right").value, transactionObject, (error, transaction) => {

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

  // append row to the HTML table
  function appendRow(data) {
    $("#access-rights").DataTable().row.add([
      "<a class='user-address' style='cursor: pointer;' href'#' >" + data[0] + "</a>",
      data[1],
      "<span class='" + data[0] + data[1] + "'><i class='fa fa-spinner fa-pulse'></i><span>"
    ]).draw();
  }

  function updateUserRights(user, accessRight) {
    certificateContract.hasRole.call(user, accessRight, function (error, result) {
      if (result) {
        for (i = 0; i < document.getElementsByClassName(user + accessRight).length; i++)
          document.getElementsByClassName(user + accessRight)[i].innerHTML = "sim <button id='" + user + "' name='" + accessRight + "' class='btn btn-danger pull-right btn-xs btn-revoke-access'>Revogar</button>";
      } else
        for (i = 0; i < document.getElementsByClassName(user + accessRight).length; i++)
          document.getElementsByClassName(user + accessRight)[i].innerHTML = "não";
    });
  }

  // Get current users
  var users = certificateContract.RoleAdded({}, {
    fromBlock: 1600000,
    toBlock: 'latest'
  });

  users.watch(function (error, result) {

    if (!error) {
      var data = [
        result.args.addr,
        result.args.roleName,
        result.blockNumber,
        result.transactionHash
      ]

      appendRow(data);
      updateUserRights(result.args.addr, result.args.roleName);

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
