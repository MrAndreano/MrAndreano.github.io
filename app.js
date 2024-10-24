const Web3 = require('web3');
const contractABI = [
    {"inputs":[],"name":"addWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addedWallets","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"getWallets","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wallets","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}
];

// Укажите адрес вашего развернутого контракта
const contractAddress = '0xf3c0fa0d0b8dd89abb39f24b4068c0b25f181c86';

// URL для подключения к тестовой сети BSC
const bscTestnetUrl = 'https://data-seed-prebsc-1-s1.bnbchain.org:8545';

let userAccount;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        // Инициализация Web3 с использованием провайдера MetaMask
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else {
        // Если MetaMask не установлен, используем провайдер для тестовой сети
        window.web3 = new Web3(new Web3.providers.HttpProvider(bscTestnetUrl));
    }
    
    document.getElementById('connectWalletButton').innerText = 'Wallet Connected';
    document.getElementById('helloButton').disabled = false;

    const accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];

    contract = new web3.eth.Contract(contractABI, contractAddress);
    checkIfUser Added();
});

document.getElementById('connectWalletButton').onclick = async () => {
    const accounts = await web3.eth.getAccounts();
    userAccount = accounts[0];
    document.getElementById('connectWalletButton').innerText = 'Wallet Connected';
    document.getElementById('helloButton').disabled = false;
    checkIfUser Added();
};

document.getElementById('helloButton').onclick = async () => {
    await contract.methods.addWallet().send({ from: userAccount });
    document.getElementById('helloButton').innerText = 'Hello already';
    document.getElementById('helloButton').classList.add('disabled');
    document.getElementById('helloButton').disabled = true;
};

async function checkIfUser Added() {
    const wallets = await contract.methods.getWallets().call();
    if (wallets.includes(userAccount)) {
        document.getElementById('helloButton').innerText = 'Hello already';
        document.getElementById('helloButton').classList.add('disabled');
        document.getElementById('helloButton').disabled = true;
    }
}