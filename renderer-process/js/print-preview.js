const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
const XLSX = require('XLSX')

let tableData = []



ipcRenderer.send('get-print-value')

ipcRenderer.on('print-data', (event, data) => {
  tableData = data
  loadData()
})


function loadData() {
  document.getElementById('data').innerHTML = ""
  for (d in tableData) {
    document.getElementById('data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>" + tableData[d].contractNumber + "</td>" +
      "<td>" + tableData[d].name + "</td>" +
      "<td>" + tableData[d].idNumber + "</td>" +
      "<td>" + tableData[d].bankAccount + "</td>" +
      "<td>" + tableData[d].startTime + "</td>" +
      "<td>" + tableData[d].firstDay + "</td>" +
      "<td>" + tableData[d].endTime + "</td>" +
      "<td>" + tableData[d].amount + "</td>" +
      "<td>" + tableData[d].interestRate + "</td>" +
      "<td>" + tableData[d].interest + "</td>" +
      "<td>" + tableData[d].tax + "</td>" +
      "<td>" + tableData[d].actualInterest + "</td>" +
      "<td>" + tableData[d].firstPayment + "</td>" +
      "<td>" + tableData[d].restPayment + "</td>" +
      "<td>" + tableData[d].restPayment + "</td>" +
      "<td>" + tableData[d].restPayment + "</td>" +
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

