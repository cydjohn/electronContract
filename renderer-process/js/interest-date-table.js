const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')
// const newWindowBtn = document.getElementById('new')

let interestDateAllData = []

let interestDateTableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  interestDateAllData = arg
})
const interestDate = document.getElementById('interest-date-table-datetimepicker2')

ipcRenderer.on('delete-contract-number', (event, arg) => {
  interestDateAllData = interestDateAllData.filter(function (item) {
    return item.contractNumber !== arg
  })
  interestDateTableData = interestDateTableData.filter(function (item) {
    return item.contractNumber !== arg
  })
  loadData()
})

function getInterestPaymentAmount(rowData) {
  if(moment(rowData.firstDay).isBefore(moment(interestDate.value))) {
    if(moment(rowData.secondDay).isBefore(moment(interestDate.value))){
      if(moment(rowData.thirdDay).isBefore(moment(interestDate.value))){
        if(moment(rowData.fourthDay).isBefore(moment(interestDate.value))){
          // 过期的
          return 0.0
        }
        else {
          console.log("last")
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
  for (d in interestDateTableData) {
    document.getElementById('interest-date-table-data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>" + interestDateTableData[d].name + "</td>" +
      "<td>" + interestDateTableData[d].bankAccount + "</td>" +
      "<td>" + interestDateTableData[d].bankName + "</td>" +
      "<td>" + interestDateTableData[d].openingBank + "</td>" +

      "<td>" + interestDate.value + "</td>" +

      "<td>" + getInterestPaymentAmount(interestDateTableData[d]) + "</td>" +
      "</tr>"
      acturalInterestSum += parseFloat(getInterestPaymentAmount(interestDateTableData[d]))
  }
  document.getElementById("interest-date-table-actural-interest-sum").innerHTML = acturalInterestSum.toFixed(2)

}


// 打印预览
const printPreview = document.getElementById('interest-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', [interestDateTableData,interestDate.value])
  const modalPath = path.join('file://', __dirname, '../../sections/windows/interest-date-table-print-preview.html')
  let win = new BrowserWindow({ width: 1000, height: 1000 })
  // win.webContents.openDevTools()
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

// 付息日筛选

function checkInterestDate(idn) {
  if (interestDate.value == "") {
    return false
  }
  return idn.firstDay.search(interestDate.value) != -1 || idn.secondDay.search(interestDate.value) != -1 || idn.thirdDay.search(interestDate.value) != -1 || idn.fourthDay.search(interestDate.value) != -1
}

interestDate.addEventListener("input", (event, arg) => {
  interestDateTableData = interestDateAllData.filter(checkInterestDate);
  loadData()
})






