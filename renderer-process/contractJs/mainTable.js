const { BrowserWindow, dialog } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment');
// const newWindowBtn = document.getElementById('new')

const XLSX = require('xlsx')

let allData = []

let tableData = []



// 搜索合同号
const contraIdSearchBox = document.getElementById("contract-id")

function checkContractNumber(bn,arr) {
  if (contraIdSearchBox.value == "") {
    return false
  }
  else if (contraIdSearchBox.value == "*") {
    return true
  }
  return bn.contractNumber.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input", () => {
  tableData = allData.filter(checkContractNumber);
  loadData()
})

// 甲方
const contractFirstPartySearchBox = document.getElementById("contract-first-party")

function checkContractFirstParty(bn) {
  if (contractFirstPartySearchBox.value == "") {
    return false
  }
  else if (contractFirstPartySearchBox.value == "*") {
    return true
  }
  return bn.firstParty.search(contractFirstPartySearchBox.value) != -1
}

contractFirstPartySearchBox.addEventListener("input", () => {
  tableData = allData.filter(checkContractFirstParty);
  loadData()
})


// 乙方
const contractSecondPartySearchBox = document.getElementById("contract-second-party")

function checkContractSecondParty(bn) {
  if (contractSecondPartySearchBox.value == "") {
    return false
  }
  else if (contractSecondPartySearchBox.value == "*") {
    return true
  }
  return bn.secondParty.search(contractSecondPartySearchBox.value) != -1
}

contractSecondPartySearchBox.addEventListener("input", () => {
  tableData = allData.filter(checkContractSecondParty);
  loadData()
})


// 车型
const contractCarTypeSearchBox = document.getElementById("contract-car-type")

function checkContractCarType(bn) {
  if (contractCarTypeSearchBox.value == "") {
    return false
  }
  else if (contractCarTypeSearchBox.value == "*") {
    return true
  }
  return bn.carType.search(contractCarTypeSearchBox.value) != -1
}

contractCarTypeSearchBox.addEventListener("input", () => {
  tableData = allData.filter(checkContractCarType);
  loadData()
})


ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  allData = arg;

  //temp
  tableData = allData;
  loadData();
})

ipcRenderer.on('add-new-contract', (event, arg) => {
  allData.push(arg)
  tableData = []
  tableData.push(arg)
  loadData()
  document.getElementById('button-table').click()
})


function loadData() {
  document.getElementById('main-table-data').innerHTML = ""
  var d = 0
  for (d in tableData) {
    document.getElementById('main-table-data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>'" + tableData[d].contractNumber + "</td>" +
      "<td>" + tableData[d].firstParty + "</td>" +
      "<td>" + tableData[d].secondParty + "</td>" +
      "<td>" + tableData[d].startTime + "</td>" +
      "<td>" + tableData[d].carType + "</td>" +
      "<td>" + tableData[d].carQuantity + "</td>" +
      "<td>" + tableData[d].stageSum + "</td>" +
      "</tr>"
  }
  calculateSum()
}

function calculateSum() {
  var quantitySum = 0;
  var staSum = 0;
  for (d in tableData) {
    quantitySum += parseInt(tableData[d].carQuantity);
    staSum += parseFloat(tableData[d].stageSum);
  }
  document.getElementById("main-table-sum").innerHTML = staSum.toFixed(2);
}