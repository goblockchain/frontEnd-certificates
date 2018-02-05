import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.home.onCreated(function () {

  if (!Meteor.userId())
    Router.go("/login")

  datatables(window, $);
  datatables_bs(window, $);

});



Template.home.onRendered(function () {

  var certificateURL = "http://localhost:8000/certificado.html?";

  // Data table
  $('#certificates').dataTable({
    "language": {
      "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Portuguese-Brasil.json"
    }
  });

  $('#certificates').on('click', 'tr', function (event) {
    if (event.currentTarget.cells[1].innerText.length == 42)
      window.location.href = certificateURL + event.currentTarget.cells[1].innerText;
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
    web3js = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/kak6M2Qgf7oHycGaCI2E"));
    console.log("infura")
  }

  if (injectedWeb3)
    $('#printCertificateForm').show();

  var contractAddress = "0xdf5696ec7d222fefe60fbf9f0792cf5605f6e81c";
  var contractAbi = [
    {
      "constant": false,
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": false,
      "inputs": [
        {
          "name": "tokenContract",
          "type": "address"
			}
		],
      "name": "withdrawTokens",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": true,
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "name": "",
          "type": "bool"
			}
		],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
	},
    {
      "constant": false,
      "inputs": [],
      "name": "withdrawBalance",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
			},
        {
          "name": "_email",
          "type": "string"
			},
        {
          "name": "_course",
          "type": "string"
			},
        {
          "name": "_hours",
          "type": "uint256"
			},
        {
          "name": "_dates",
          "type": "string"
			}
		],
      "name": "printCertificate",
      "outputs": [
        {
          "name": "_certificateAddress",
          "type": "address"
			}
		],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": false,
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": false,
      "inputs": [
        {
          "name": "_user",
          "type": "address"
			},
        {
          "name": "_transaction",
          "type": "uint256"
			}
		],
      "name": "grantAccess",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": false,
      "inputs": [
        {
          "name": "_certificateContract",
          "type": "address"
			}
		],
      "name": "invalidateCertificate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": false,
      "inputs": [
        {
          "name": "_user",
          "type": "address"
			},
        {
          "name": "_transaction",
          "type": "uint256"
			}
		],
      "name": "revokeAccess",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
	},
    {
      "constant": true,
      "inputs": [
        {
          "name": "_user",
          "type": "address"
			},
        {
          "name": "_transaction",
          "type": "uint256"
			}
		],
      "name": "hasAccess",
      "outputs": [
        {
          "name": "",
          "type": "bool"
			}
		],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
	},
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "contractAddress",
          "type": "address"
			},
        {
          "indexed": false,
          "name": "_name",
          "type": "string"
			},
        {
          "indexed": false,
          "name": "email",
          "type": "string"
			},
        {
          "indexed": false,
          "name": "_course",
          "type": "string"
			},
        {
          "indexed": false,
          "name": "_dates",
          "type": "string"
			}
		],
      "name": "logPrintedCertificate",
      "type": "event"
	}
  ]

  echosContract = web3js.eth.contract(contractAbi).at(contractAddress);
  abiDecoder.addABI(contractAbi);

  // table functions

  // append row to the HTML table
  function appendRow(data) {
    $("#certificates").DataTable().row.add([
      data[0],
      data[1],
      data[2],
      data[3],
      data[4]
    ]).draw();
  }

  // Get printed certificates
  var certificates = echosContract.logPrintedCertificate({}, {
    fromBlock: 1600000,
    toBlock: 'latest'
  });

  var shownCertificates = new Array()
  certificates.watch(function (error, result) {

    if (!error) {
      var data = [
        result.blockNumber.toString(),
        result.args.contractAddress,
        result.args._name,
        result.args._course,
        result.args._dates,
      ]

      shownCertificates.push(data[1]);
      appendRow(data);

    } else {
      console.log(error);
    }
  });


});
