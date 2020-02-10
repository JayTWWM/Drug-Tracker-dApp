var contractABI = null;
var contractAddress = null;
var account0 = null;
var AssetTrackerContract = null;
$.ajax({
  url: "./build/contracts/AssetTracker.json",
  async: false,
  dataType: "json",
  delay: 500,
  success: function (json) {
    assignVariable(json);

  }
});
function assignVariable(data) {
  contractABI = data.abi;
  contractAddress = data.networks[5777].address;
}

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProviders("http://127.0.0.1:7545"));
}

web3.eth.getAccounts().then(function (result) {
  account0 = result[0];
});

setTimeout(function delay() {
  AssetTrackerContract = new web3.eth.Contract(
    contractABI,
    contractAddress,
    { from: account0 }
  );
}, 1000);


setTimeout(function delay() {
  Object.freeze(account0);
}, 4000);
