const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')

var tableData = []
var printDate = ""
ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
    tableData = data[0]
    printDate = data[1]
    loadData()
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



const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

