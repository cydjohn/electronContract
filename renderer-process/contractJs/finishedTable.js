const { BrowserWindow, dialog } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment');
// const newWindowBtn = document.getElementById('new')

const XLSX = require('xlsx')

let finishedAllData = []

let finishedTableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  finishedAllData = arg;

  //temp
  finishedTableData = finishedAllData;
  // console.log(finishedTableData);
  loadData();
})


// 搜索合同号
const contraIdSearchBox = document.getElementById("finished-contract-id")

function checkContractNumber(bn, arr) {
  if (contraIdSearchBox.value == "") {
    return false
  }
  else if (contraIdSearchBox.value == "*") {
    return true
  }
  return bn.contractNumber.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input", () => {
  finishedTableData = finishedAllData.filter(checkContractNumber);
  loadData()
})



function loadData() {
  document.getElementById('finished-table-data').innerHTML = ""
  var d = 0
  for (d in finishedTableData) {
    let s = finishedTableData[d].stages;
    s.sort();
    let lastDay = s[s.length - 1];
    console.log(s);
    if (moment(new Date()).isBefore(moment(lastDay))) {
      document.getElementById('finished-table-data').innerHTML +=
        "<tr>" +
        "<td>" + (parseInt(d) + 1) + "</td>" +
        "<td>" + finishedTableData[d].contractNumber + "</td>" +
        "<td>" + finishedTableData[d].secondParty + "</td>" +
        "<td>" + finishedTableData[d].stageSum + "</td>" +
        "<td>" + lastDay.time + "</td>" +
        "</tr>"
    }
  }
}

