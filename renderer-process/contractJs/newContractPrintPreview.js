const { ipcRenderer, remote } = require('electron');
var moment = require('moment')
const path = require('path')
const { BrowserWindow } = require('electron').remote



ipcRenderer.send('request-temp-data')
const confirmSign = document.getElementById('confirm-sign')
ipcRenderer.on('get-temp-data', (event, arg) => {
    loadData(arg)
})


function loadData(contract) {
    const contractNumber = document.getElementById("new-contract-number");
    const firstParty = document.getElementById("new-contract-first-party");
    const secondParty = document.getElementById("new-contract-second-party");
    const startTime = document.getElementById("new-contract-start-time");
    const carType = document.getElementById("new-contract-car-type");
    const carQuantity = document.getElementById("new-contract-car-quantity");
    const stageSum = document.getElementById("new-contract-stage-sum");
    const amountSum = document.getElementById("new-amount-sum");
    var stages = [];

    contractNumber.value = contract.contractNumber;
    firstParty.value = contract.firstParty;
    secondParty.value = contract.secondParty;
    startTime.value = contract.startTime;
    carType.value = contract.carType;
    carQuantity.value = contract.carQuantity;
    stageSum.value = contract.stageSum;
}

function loadStages() {
    
}







const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    console.log('asdfafasdfadsf')
    confirmSign.hidden = false
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    confirmSign.hidden = true
    printPDFBtn.hidden = false
})
