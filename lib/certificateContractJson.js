certificateContractJson = {
  "contractName": "CertificatePrint",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "certificates",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "string"
        },
        {
          "name": "ownerAddress",
          "type": "address"
        },
        {
          "name": "institution",
          "type": "bytes32"
        },
        {
          "name": "course",
          "type": "string"
        },
        {
          "name": "dates",
          "type": "string"
        },
        {
          "name": "courseHours",
          "type": "uint16"
        },
        {
          "name": "valid",
          "type": "bool"
        },
        {
          "name": "issuerAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "certificateData",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_price",
          "type": "uint256"
        },
        {
          "name": "_token",
          "type": "address"
        },
        {
          "name": "_accessControl",
          "type": "address"
        },
        {
          "name": "_wallet",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "certificateHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "email",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "ownerAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "institution",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "course",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "dates",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "_hours",
          "type": "uint16"
        }
      ],
      "name": "logPrintedCertificate",
      "type": "event"
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
          "name": "_ownerAddress",
          "type": "address"
        },
        {
          "name": "_institution",
          "type": "bytes32"
        },
        {
          "name": "_course",
          "type": "string"
        },
        {
          "name": "_dates",
          "type": "string"
        },
        {
          "name": "_hours",
          "type": "uint16"
        },
        {
          "name": "_data",
          "type": "bytes32"
        }
      ],
      "name": "printCertificate",
      "outputs": [
        {
          "name": "certificateAddress",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_certificateAddress",
          "type": "bytes32"
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
          "name": "_newPrice",
          "type": "uint256"
        }
      ],
      "name": "updatePrice",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_newAddress",
          "type": "address"
        }
      ],
      "name": "updateToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTokenAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "issuerAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "compiler": {
    "name": "solc",
    "version": "0.4.24+commit.e67f0147.Emscripten.clang"
  },
  "networks": {
    "4": {
      "events": {},
      "links": {},
      "address": "0x2a4fd46d7ae546af3c4ea80092ebf2317f29e58a",
      "transactionHash": "0x2a0ab85a7225943c79fb0da2f01660731f69644a1053555c2a3537b0714ccb75"
    },
    "5777": {
      "events": {
        "0x6361f3ac79d959ef5ba5e4979b3de068ad2d57a41540c61d09999a6805d1ca89": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "certificateHash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "email",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "ownerAddress",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "institution",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "course",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "dates",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "_hours",
              "type": "uint16"
            }
          ],
          "name": "logPrintedCertificate",
          "type": "event"
        }
      },
      "links": {},
      "address": "0x0B2cCa84CD7C96991960f2F877667f327641b94b",
      "transactionHash": "0x464fcf7b5bb3bfbf584f4a7800cc9d7565fa718d9060b5548453f602f9e98a0b"
    }
  },
  "schemaVersion": "2.0.1",
  "updatedAt": "2019-01-12T19:39:06.606Z"
}