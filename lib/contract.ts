export const contractAddress = "0xEC289b221391d089299EDAf6CFA57c1f285794a7";

export const contractABI = [
  {
    "inputs": [],
    "name": "getMyDetails",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "uint256", "name": "_age", "type": "uint256" },
      { "internalType": "string", "name": "_course", "type": "string" }
    ],
    "name": "registerStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "students",
    "outputs": [
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "uint256", "name": "age", "type": "uint256" },
      { "internalType": "string", "name": "course", "type": "string" },
      { "internalType": "uint256", "name": "studentId", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
