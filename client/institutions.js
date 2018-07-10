import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.institutions.events({
    'click .btn-revoke-institution' (event, instance) {
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
        certificateContract.invalidateInstitution.sendTransaction(event.target.id, transactionObject, (error, transaction) => {

            // send email
            if (!error) {
                var sent = false;
                // get transaction result 
                console.log(transaction);
            } else
                console.log(error)
        });

    },
    'click #new-institution' (event, instance) {
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

        certificateContract.addInstitution.sendTransaction(document.getElementById("name").value, document.getElementById("code").value, transactionObject, (error, transaction) => {

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

Template.institutions.onRendered(function () {
    datatables(window, $);
    datatables_bs(window, $);

    // append row to the HTML table
    function appendRow(data) {
        $("#institutions-data-table").DataTable().row.add([
      "<small><a class='institution-address' style='cursor: pointer;' href'#' >" + data[0] + "</a><small>",
      data[1],
      "<span class='" + data[0] + "'><i class='fa fa-spinner fa-pulse'></i><span>"
    ]).draw();
    }

    function updateInstitution(hash) {
        certificateContract.institutions.call(hash, function (error, result) {
            if (result[4]) {
                for (i = 0; i < document.getElementsByClassName(hash).length; i++)
                    document.getElementsByClassName(hash)[i].innerHTML = "sim (" + result[0] + ")<button id='" + hash + "' name='" + hash + "' class='btn btn-danger pull-right btn-xs btn-revoke-institution'>Revogar</button>";
            } else
                for (i = 0; i < document.getElementsByClassName(hash).length; i++)
                    document.getElementsByClassName(hash)[i].innerHTML = "não";
        });
    }

    // Get current users
    var users = certificateContract.logNewInstitution({}, {
        fromBlock: 1600000,
        toBlock: 'latest'
    });

    users.watch(function (error, result) {

        if (!error) {
            var data = [
        result.args.hash,
        result.args.name,
        result.blockNumber,
        result.transactionHash
      ]

            appendRow(data);
            updateInstitution(result.args.hash);

        } else {
            console.log(error);
        }
    });


    // data table
    $('#institutions-data-table').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json"
        }
    });

})
