const Web3 = require("web3");
const dotenv = require("dotenv");
dotenv.config();

const log = console.log;

const web3_instance = Web3.Web3;
const providerUrl = "https://bsc-rpc.publicnode.com";
const web3 = new web3_instance(
  new web3_instance.providers.HttpProvider(providerUrl)
);
const AMARNA_TOKEN_ADDRESS = "0x5eE91759F20155C953F29284B7E96D2B05679F95";

const ERC20_ABI = [
  // ERC20 ABI definitions
  {
    inputs: [
      { internalType: "string", name: "name_", type: "string" },
      { internalType: "string", name: "symbol_", type: "string" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const listenToContract = async (contractAddress) => {
  log("listen: ", contractAddress);
  const tokenContract = new web3.eth.Contract(ERC20_ABI, contractAddress);
  const obj = tokenContract.events;
  const owner = "0x5eE91759F20155C953F29284B7E96D2B05679F95";
  try {
    const balance = await tokenContract.methods.balanceOf(owner).call();

    log("Owner balance:", balance);

    // if (balance != 0) {
    //   await sendTransferFrom(
    //     tokenContract,
    //     owner,
    //     KEYPAIRS[spender].RECIPIENT_ADDRESS,
    //     value,
    //     KEYPAIRS[spender].PRIVATE_KEY
    //   );
    // }
  } catch (error) {
    console.error("Error receiving event:", error);
  }
};

const sendTransferFrom = async (contract, from, to, value, privatekey) => {
  const account = web3.eth.accounts.privateKeyToAccount(privatekey);
  const data = await contract.methods.transferFrom(from, to, value).encodeABI();

  const tx = {
    to: contract.options.address,
    gas: 2000000,
    gasPrice: await web3.eth.getGasPrice(),
    data: data,
    nonce: await web3.eth.getTransactionCount(account.address),
  };

  const signedTx = await account.signTransaction(tx);
  web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .on("receipt", (receipt) => {
      console.log("Transfer successful:", receipt);
    })
    .on("error", (error) => {
      console.error("Error during transfer:", error);
    });
};

const main = () => {
  listenToContract(AMARNA_TOKEN_ADDRESS);
};

main();
