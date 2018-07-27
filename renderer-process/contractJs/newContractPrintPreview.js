const { ipcRenderer, remote } = require('electron');
var moment = require('moment')
const path = require('path')
const { BrowserWindow } = require('electron').remote

const contractNumber = document.getElementById("new-contract-number");
const firstParty = document.getElementById("new-contract-first-party");
const secondParty = document.getElementById("new-contract-second-party");
const startTime = document.getElementById("new-contract-start-time");
const carType = document.getElementById("new-contract-car-type");
const carQuantity = document.getElementById("new-contract-car-quantity");
const stageSum = document.getElementById("new-contract-stage-sum");
const amountSum = document.getElementById("new-amount-sum");


const addNewStageButton = document.getElementById("add-stages");
var stages = [];
const alertLabel = document.getElementById('alertLabel')
alertLabel.hidden = true

const addNewContractButton = document.getElementById("add-new");