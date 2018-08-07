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
    document.getElementById('pay-time-table-data').innerHTML = ""
    var d = 0
    var counter = 1;
    for (d in tableData) {
      document.getElementById('pay-time-table-data').innerHTML +=
        "<tr>" +
        "<td>" + counter++ + "</td>" +
        "<td>" + tableData[d].contractNumber + "</td>" +
        "<td>" + tableData[d].secondParty + "</td>" +
        "<td>" + toAccountingBookkeepingFormat(tableData[d].amount) + "</td>" +
        "<td>" + tableData[d].time + "</td>" +
        "</tr>"
    }
    calculateSum()
  }
  
  function calculateSum() {
    var amountSum = 0;
    var d = 0;
    for (d in tableData) {
      amountSum += parseFloat(tableData[d].amount);
    }
    document.getElementById("pay-time-table-sum").innerHTML = toAccountingBookkeepingFormat(amountSum.toFixed(2));
  }
  


const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    printPDFBtn.hidden = true
    ipcRenderer.send('print-to-pdf')
})

ipcRenderer.on('wrote-pdf', (event, path) => {
    printPDFBtn.hidden = false
})

function toAccountingBookkeepingFormat(str) {
  var newStr = "";
  var count = 0;

  if (str.indexOf(".") == -1) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + ".00"; //自动补小数点后两位
    return str;
  }
  else {
    for (var i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
      } else {
        newStr = str.charAt(i) + newStr; //逐个字符相接起来
      }
      count++;
    }
    str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    return str;
  }
}