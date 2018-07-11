 // Web3 stuff
 contractAddress = "0x1554e84ddcd54146fc4764f9f2a016e806035b17"

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