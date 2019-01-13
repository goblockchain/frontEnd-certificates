// Web3 stuff
FROM_BLOCK = 0 // used to set deployment block, not check previous events
// Init web3
var Web3 = require('web3');

if (Meteor.isClient && typeof window.ethereum !== 'undefined') {
    // metamask is available
    window.ethereum.enable();    
    web3js = new Web3(window.web3.currentProvider);
    console.log("metamask")
  } else {
    //user is not running metamask
    // create provider through infura
    const provider = new Web3.providers.HttpProvider(
      // pass url of remote node
      'https://rinkeby.infura.io/v3/9084b283951942d29c541819c451a38a'
    );
    web3js = new Web3(provider);
    console.log("infura")
  }

if (certificateContractJson.networks[web3js.version.network]) { // rede compatível
    contractAddress = certificateContractJson.networks[web3js.version.network].address
    RBACAddress = accessControlJson.networks[web3js.version.network].address

    certificateContract = web3js.eth.contract(certificateContractJson.abi).at(contractAddress)
    accessControlContract = web3js.eth.contract(accessControlJson.abi).at(RBACAddress)
}

