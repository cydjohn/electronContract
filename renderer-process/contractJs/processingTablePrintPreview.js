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
            "<td>" + toAccountingBookkeepingFormat(processingTableData[d].payedMoney.toFixed(2)) + "</td>" +
            "<td>" + toAccountingBookkeepingFormat(processingTableData[d].unpayedMoney.toFixed(2)) + "</td>" +
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