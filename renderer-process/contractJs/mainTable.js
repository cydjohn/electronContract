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
      console.log(tableData[d]);
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
    // calculateSum()
  }