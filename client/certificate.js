Template.certificate.helpers({
  certificateAddress() {
    return Router.current().params.certificateAddress;
  },
  invalid() {
    return Session.get("invalid");
  },
  valid() {
    return Session.get("valid");
  }
});

Template.certificate.events({
  'click #printPDF' (event, instance) {
    html2canvas(window.document.getElementById("certificate"), {
      scale: 2
    }).then(function (canvas) {
      var a = document.createElement('a');
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      a.download = 'Bizancio - Certificado.png';
      a.click();
    });
  },
})

Template.certificate.onCreated(function () {
  // Web3 stuff

  // Init web3
  var Web3 = require('web3');

  if (typeof web3 !== 'undefined') {
    web3js = new Web3(web3.currentProvider);
    console.log("injected web3");
  } else {
    //set the provider to Rinkeby/Infura, will only work for view functions
    web3js = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/kak6M2Qgf7oHycGaCI2E"));
    console.log("infura")
  }

  var bizancioContract = web3js.eth.contract(contractAbi).at(contractAddress);


  // get certificate data
  bizancioContract.certificates.call(Router.current().params.certificateAddress, function (error, result) {
    if (!error) {
      if (result[5] == false) {
        Session.set("invalid", true)
        return;
      }

      Session.set("valid", true)

      if (result[2] == "Impacta - Workshop Blockchain")
        document.getElementById("diploma").src = "/template.png";

      document.getElementById("name").textContent = result[0];
      document.getElementById("course").textContent = result[2] + " é um curso da Impacta em parceria com a Bizanc.io com duração de " + result[4].c[0] + " horas.";
      document.getElementById("dates").textContent = "Realizado em " + result[3] + ".";

    } else
      Session.set("invalid", true)
  });
});
