const { BrowserWindow, dialog } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment');
// const newWindowBtn = document.getElementById('new')

const XLSX = require('xlsx')

let allData = []

let tableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
    allData = arg;

    //temp
    tableData = allData;
    // console.log(tableData);
    loadData();
})


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



function loadData() {
    document.getElementById('finished-table-data').innerHTML = ""
    var d = 0
    for (d in tableData) {
        let lastDay = tableData[d].stages.pop();
        if (moment(new Date()).isAfter(moment(lastDay))) {
            document.getElementById('finished-table-data').innerHTML +=
                "<tr>" +
                "<td>" + (parseInt(d) + 1) + "</td>" +
                "<td>" + tableData[d].contractNumber + "</td>" +
                "<td>" + tableData[d].secondParty + "</td>" +
                "<td>" + tableData[d].stageSum + "</td>" +
                "<td>" + lastDay.time + "</td>" +
                "</tr>"
        }
    }
}

