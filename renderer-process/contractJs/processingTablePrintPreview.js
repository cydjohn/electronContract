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
        var s = 0;
        var counter = 0;
        var payedMoney = 0;
        var unpayedMoney = 0;
        for (s in processingTableData[d].stages) {
            if (moment(new Date()).isBefore(moment(processingTableData[d].stages[s].time))) {
                counter += 1;
                unpayedMoney += parseFloat(processingTableData[d].stages[s].amount);
            }
            else {
                payedMoney += parseFloat(processingTableData[d].stages[s].amount);
            }
        }

        if (counter>0) {
            document.getElementById('processing-table-data').innerHTML +=
                "<tr>" +
                "<td>" + (parseInt(d) + 1) + "</td>" +
                "<td>" + processingTableData[d].contractNumber + "</td>" +
                "<td>" + processingTableData[d].secondParty + "</td>" +
                "<td>" + payedMoney.toFixed(2) + "</td>" +
                "<td>" + unpayedMoney.toFixed(2) + "</td>" +
                "<td>" + counter + "</td>" +
                "</tr>"
        }
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

