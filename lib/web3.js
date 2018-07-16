 // Web3 stuff
 contractAddress = "0x2b8d13f2f7f308b876851150786b67e193e0f1f6"

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

 certificateContract = web3js.eth.contract(contractAbi).at(contractAddress);
