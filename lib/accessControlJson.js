accessControlJson = {
  "contractName": "Issuers",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "bytes32"
        }
      ],
      "name": "checkRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "bytes32"
        }
      ],
      "name": "adminAddRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_institutionHash",
          "type": "bytes32"
        }
      ],
      "name": "invalidateInstitution",
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
          "name": "_code",
          "type": "string"
        }
      ],
      "name": "addInstitution",
      "outputs": [
        {
          "name": "institutionHash",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
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
      "name": "institutions",
      "outputs": [
        {
          "name": "code",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "validFrom",
          "type": "uint256"
        },
        {
          "name": "validTo",
          "type": "uint256"
        },
        {
          "name": "valid",
          "type": "bool"
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
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "bytes32"
        }
      ],
      "name": "hasRole",
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
      "inputs": [
        {
          "name": "addr",
          "type": "address"
        },
        {
          "name": "roleName",
          "type": "bytes32"
        }
      ],
      "name": "adminRemoveRole",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "ROLE_ADMIN",
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
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_address",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "institution",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "logNewInssuer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_hash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "logNewInstitution",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "roleName",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "addr",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "roleName",
          "type": "bytes32"
        }
      ],
      "name": "RoleRemoved",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_issuerAddress",
          "type": "address"
        },
        {
          "name": "_institution",
          "type": "bytes32"
        }
      ],
      "name": "addIssuer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_issuerAddress",
          "type": "address"
        },
        {
          "name": "_institution",
          "type": "bytes32"
        }
      ],
      "name": "revokeIssuer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
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
      "address": "0xd3848ac25c894624c6829e81f543634d1ea9b844",
      "transactionHash": "0x491a453425cfe1419e5f07d54d918cc1a631edccb6013352939d4b95f3b65377"
    },
    "5777": {
      "events": {
        "0x11645cb1c6d01b34f90ab6a27e540cfd35ed6d182d2e59ea6231cd20f237fffc": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "_address",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "institution",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "logNewInssuer",
          "type": "event"
        },
        "0x232dd1a7a5f228343d34f4399fecf110aaba37abbf6ee49bbc5c4889136bb33b": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "_hash",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "logNewInstitution",
          "type": "event"
        },
        "0xaa695d83684b95e18fda4eda7e1794787e74fbc90097a9582f5c41989687883e": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "addr",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "roleName",
              "type": "bytes32"
            }
          ],
          "name": "RoleAdded",
          "type": "event"
        },
        "0x47808f9766351846ab3f47ddfd0cfc00fd1a4831674f2c872826932b0184d0be": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "addr",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "roleName",
              "type": "bytes32"
            }
          ],
          "name": "RoleRemoved",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xd79ed6e1c555b30dB87d7bE0FC10A0512B0701C7",
      "transactionHash": "0x94f90b3684773368b50cc7fadd003be26cd7a189a92c9e9c3c64d899e00ede4b"
    }
  },
  "schemaVersion": "2.0.1",
  "updatedAt": "2019-01-12T19:39:06.599Z"
}