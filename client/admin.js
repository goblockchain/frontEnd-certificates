Template.admin.onRendered(function () {
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

  var contractAddress = "0xc5452d2f42c4ad570f3af3b492e48d9cf10cf998";
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
})
