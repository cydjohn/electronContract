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
  allData = arg
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
      document.getElementById('main-table-data').innerHTML +=
        "<tr>" +
        "<td>" + (parseInt(d) + 1) + "</td>" +
        "<td>" + tableData[d].contractNumber + "</td>" +
        "<td>" + tableData[d].name + "</td>" +
        "<td>'" + tableData[d].idNumber + "</td>" +
        "<td>'" + tableData[d].bankAccount + "</td>" +
        "<td>" + tableData[d].bankName + "</td>" +
        "<td>" + tableData[d].openingBank + "</td>" +
        "<td>" + tableData[d].startTime + "</td>" +
        // "<td>" + getInterestPaymentData(tableData[d]) + "</td>" +
        "<td>" + tableData[d].endTime + "</td>" +
        "<td>" + tableData[d].amount + "</td>" +
        "<td>" + tableData[d].interestRate + "</td>" +
        "<td>" + parseFloat(tableData[d].interest).toFixed(2) + "</td>" +
        "<td>" + tableData[d].tax + "</td>" +
        "<td>" + tableData[d].actualInterest + "</td>" +
        "</tr>"
    }
    calculateSum()
  }