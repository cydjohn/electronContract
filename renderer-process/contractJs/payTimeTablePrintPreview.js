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
    console.log(tableData);
    document.getElementById('pay-time-table-data').innerHTML = ""
    var d = 0
    var counter = 1;
    for (d in tableData) {
        var s = 0;
        for (s in tableData[d].stages) {
            document.getElementById('pay-time-table-data').innerHTML +=
                "<tr>" +
                "<td>" + counter++ + "</td>" +
                "<td>'" + tableData[d].contractNumber + "</td>" +
                "<td>" + tableData[d].secondParty + "</td>" +
                "<td>" + tableData[d].stages[s].amount + "</td>" +
                "<td>" + tableData[d].stages[s].time + "</td>" +
                "</tr>"
        }
    }
    calculateSum()
}

function calculateSum() {
    var amountSum = 0;
    var d = 0;
    for (d in tableData) {
        var s = 0;
        for (s in tableData[d].stages) {
            amountSum += parseFloat(tableData[d].stages[s].amount);
        }
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

