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
    document.getElementById('pay-time-table-data').innerHTML = ""
    var d = 0
    var counter = 1;
    for (d in tableData) {
      document.getElementById('pay-time-table-data').innerHTML +=
        "<tr>" +
        "<td>" + counter++ + "</td>" +
        "<td>" + tableData[d].contractNumber + "</td>" +
        "<td>" + tableData[d].secondParty + "</td>" +
        "<td>" + tableData[d].amount + "</td>" +
        "<td>" + tableData[d].time + "</td>" +
        "</tr>"
    }
    calculateSum()
  }
  
  function calculateSum() {
    var amountSum = 0;
    var d = 0;
    for (d in tableData) {
      amountSum += parseFloat(tableData[d].amount);
    }
    document.getElementById("pay-time-table-sum").innerHTML = amountSum.toFixed(2);
  }
  


const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

