const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')

var processingTableData = []
var printDate = ""
ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
    processingTableData = data[0]
    printDate = data[1]
    processingTableLoadData()
})

function processingTableLoadData() {
    document.getElementById('processing-table-data').innerHTML = ""
    var d = 0
    for (d in processingTableData) {

        document.getElementById('processing-table-data').innerHTML +=
            "<tr>" +
            "<td>" + (parseInt(d) + 1) + "</td>" +
            "<td>" + processingTableData[d].contractNumber + "</td>" +
            "<td>" + processingTableData[d].secondParty + "</td>" +
            "<td>" + processingTableData[d].payedMoney.toFixed(2) + "</td>" +
            "<td>" + processingTableData[d].unpayedMoney.toFixed(2) + "</td>" +
            "<td>" + processingTableData[d].counter + "</td>" +
            "</tr>"

    }
}




const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

