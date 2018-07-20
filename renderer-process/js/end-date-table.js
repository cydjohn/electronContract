const { BrowserWindow } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment')
// const newWindowBtn = document.getElementById('new')

let endDateAllData = []

let endDateTableData = []
// loadData()
const endDate = document.getElementById('end-date-table-datetimepicker3')
ipcRenderer.send('request-all-data')
ipcRenderer.on('get-all-data', (event, arg) => {
  endDateAllData = arg
})


function loadData() {
  document.getElementById('end-date-table-data').innerHTML = ""
  for (d in endDateTableData) {
    document.getElementById('end-date-table-data').innerHTML +=
      "<tr>" +
      "<td>" + (parseInt(d) + 1) + "</td>" +
      "<td>" + endDateTableData[d].name + "</td>" +
      "<td>" + endDateTableData[d].bankAccount + "</td>" +
      "<td>" + endDateTableData[d].bankName + "</td>" +
      "<td>" + endDateTableData[d].openingBank + "</td>" +
      "<td>" + endDateTableData[d].startTime + "</td>" +
      "<td>" + endDateTableData[d].endTime + "</td>" +
      "<td>" + endDateTableData[d].amount + "</td>" +
      "<td>" + endDateTableData[d].actualInterest + "</td>" +
      "<td>" + (parseFloat(endDateTableData[d].actualInterest) + parseFloat(endDateTableData[d].amount)).toFixed(2) + "</td>" +
      "</tr>"
  }
  calculateSum()
}

function calculateSum() {
  var loanSum = 0;
  var acturalInterestSum = 0;
  for (i in endDateTableData) {
    loanSum += parseFloat(endDateTableData[i].amount)
    acturalInterestSum += parseFloat(endDateTableData[i].actualInterest)
  }
  document.getElementById("end-date-table-loan-sum").innerHTML = loanSum
  document.getElementById("end-date-table-actural-interest-sum").innerHTML = acturalInterestSum.toFixed(2)
  document.getElementById("end-date-table-sum").innerHTML = parseFloat(loanSum + acturalInterestSum).toFixed(2)
}








// 打印预览
const printPreview = document.getElementById('end-date-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', [endDateTableData, endDate.value])
  const modalPath = path.join('file://', __dirname, '../../sections/windows/end-date-table-print-preview.html')
  let win = new BrowserWindow({ width: 800, height: 1000 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})


// 还款日期筛选

function checkEndDate(idn) {
  if (endDate.value == "") {
    return false
  }
  return idn.endTime.search(endDate.value.slice(0, 7)) != -1
}

endDate.addEventListener("input", (event, arg) => {
  endDateTableData = endDateAllData.filter(checkEndDate);
  endDateTableData.sort(function (a, b) {
    return moment(a.endTime).isAfter(moment(b.endTime));
  });
  loadData()
})








