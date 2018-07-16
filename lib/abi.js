contractAbi = [
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
                "name": "instructorName",
                "type": "string"
        },
            {
                "name": "instructorAddress",
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
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "contractAddress",
                "type": "bytes32"
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
                "name": "_institution",
                "type": "bytes32"
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
                "name": "hash",
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
                "name": "_name",
                "type": "string"
        },
            {
                "name": "_email",
                "type": "string"
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
                "name": "instructorName",
                "type": "string"
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
    }
  ]
