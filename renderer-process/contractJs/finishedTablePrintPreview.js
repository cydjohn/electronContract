const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')

var finishedTableData = []
var printDate = ""
ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
    finishedTableData = data[0]
    printDate = data[1]
    loadData()
})

function loadData() {
    document.getElementById('finished-table-data').innerHTML = ""
    var d = 0;
    var counter = 1;
    for (d in finishedTableData) {
      var s = 0;
      var isFinished = false;
      var lastDay = finishedTableData[d].stages[0].time;
      for(s in finishedTableData[d].stages) {
        if (moment(new Date()).isBefore(moment(finishedTableData[d].stages[s].time))) {
          isFinished = false;
        }
        else {
          isFinished = true;
        }
        if (moment(lastDay).isBefore(moment(finishedTableData[d].stages[s].time))) {
          lastDay = finishedTableData[d].stages[s].time;
        }
      }
      
      if (isFinished) {
  
        document.getElementById('finished-table-data').innerHTML +=
          "<tr>" +
          "<td>" + counter++ + "</td>" +
          "<td>" + finishedTableData[d].contractNumber + "</td>" +
          "<td>" + finishedTableData[d].secondParty + "</td>" +
          "<td>" + finishedTableData[d].stageSum + "</td>" +
          "<td>" + lastDay + "</td>" +
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

