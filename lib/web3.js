// Web3 stuff

// Init web3
var Web3 = require('web3');

var injectedWeb3 = false;
if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    var injectedWeb3 = true;
    var netVersion = web3js.version.network;
} else {
    //set the provider to Rinkeby/Infura, will only work for view functions
    // defaults to rinkedby
    web3js = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/kak6M2Qgf7oHycGaCI2E"));
    var netVersion = web3js.version.network;
}

if (!netVersion) {
    var netVersion = 4
}

contractAddress = certificateContractJson.networks[netVersion].address

certificateContract = web3js.eth.contract(certificateContractJson.abi).at(contractAddress)
accessControlContract = web3js.eth.contract(accessControlJson.abi).at(accessControlJson.networks[netVersion].address);
