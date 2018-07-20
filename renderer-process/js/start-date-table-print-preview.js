const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')

let tableData = []
var printDate = ""

ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
    tableData = data[0]
    printDate = data[1]
    loadData()
})


function loadData() {
    document.getElementById('start-date-table-data').innerHTML = ""
    for (d in tableData) {
        document.getElementById('start-date-table-data').innerHTML +=
            "<tr>" +
            "<td>" + (parseInt(d) + 1) + "</td>" +
            "<td>" + tableData[d].contractNumber + "</td>" +
            "<td>" + tableData[d].name + "</td>" +
            "<td>" + tableData[d].bankAccount + "</td>" +
            "<td>" + tableData[d].startTime + "</td>" +
            "<td>" + parseFloat(tableData[d].amount).toFixed(2) + "</td>" +
            "</tr>"
    }
    calculateSum()
}

function calculateSum() {
    var loanSum = 0
    for (i in tableData) {
      loanSum += parseFloat(tableData[i].amount)
    }
    document.getElementById("start-date-table-loan-sum").innerHTML = loanSum.toFixed(2)
  }

const printPDFBtn = document.getElementById('start-date-table-print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

