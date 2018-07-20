const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')

let tableData = []

var printDate = ""
ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
    tableData = data[0]
    printDate = data[1]
    loadData()
})

function getInterestPaymentAmount(rowData) {
    if(moment(rowData.firstDay).isBefore(moment(printDate))) {
      if(moment(rowData.secondDay).isBefore(moment(printDate))){
        if(moment(rowData.thirdDay).isBefore(moment(printDate))){
          if(moment(rowData.fourthDay).isBefore(moment(printDate))){
            // 过期的
          return 0.0
          }
          else {
            return (rowData.actualInterest - rowData.firstPayment - rowData.restPayment *2).toFixed(2)
          }
        }
        else {
          return rowData.restPayment
        }
      }
      else {
        return rowData.restPayment
      }
    }
    else {
  
      return rowData.firstPayment
    }
  }
  


function loadData() {
    var acturalInterestSum = 0
    document.getElementById('interest-date-table-data').innerHTML = ""
    for (d in tableData) {
        document.getElementById('interest-date-table-data').innerHTML +=
        "<tr>" +
        "<td>" + (parseInt(d) + 1) + "</td>" +
        "<td>" + tableData[d].name + "</td>" +
        "<td>" + tableData[d].bankAccount + "</td>" +
        "<td>" + tableData[d].bankName + "</td>" +
        "<td>" + tableData[d].openingBank + "</td>" +
        "<td>" + printDate + "</td>" +
        "<td>" + getInterestPaymentAmount(tableData[d]) + "</td>" +
        "</tr>"
        acturalInterestSum += parseFloat(getInterestPaymentAmount(tableData[d]))
    }
    document.getElementById("interest-date-table-actural-interest-sum").innerHTML = acturalInterestSum.toFixed(2)

}



const printPDFBtn = document.getElementById('interest-date-table-print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

