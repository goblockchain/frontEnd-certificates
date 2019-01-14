// Web3 stuff
FROM_BLOCK = 0 // used to set deployment block, not check previous events
// Init web3
var Web3 = require('web3');

if(Meteor.isClient) {
window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum !== 'undefined') {
      web3js = new Web3(ethereum);
      try {
          // Request account access if needed
          await ethereum.enable();
          console.log("browser")
          // Acccounts now exposed
      } catch (error) {
          // User denied account access...
      }
  }
  // Legacy dapp browsers...
  else if (window.web3 !== 'undefined') {
      web3js = new Web3(web3.currentProvider);
      console.log("browser, legacy")
      // Acccounts always exposed
  }
  // Non-dapp browsers...
  else {
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
});

}