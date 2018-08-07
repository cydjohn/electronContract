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
  allData = arg;

  //temp
  tableData = payTimeTableConvert(allData);
  // console.log(tableData);
  loadData();
})


// 搜索合同号
const contraIdSearchBox = document.getElementById("pay-contract-id")

function checkContractNumber(bn, arr) {
  if (contraIdSearchBox.value == "") {
    return false
  }
  else if (contraIdSearchBox.value == "*") {
    return true
  }
  return bn.contractNumber.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input", () => {

  tableData = payTimeTableConvert(allData.filter(checkContractNumber));
  loadData()
})

// 借款日期筛选
const startDate = document.getElementById('pay-start-time')
function checkStartDate(idn) {
  if (startDate.value == "") {
    return false
  }
  return idn.time.search(startDate.value.slice(0, 7)) != -1
}

startDate.addEventListener("input", (event, arg) => {
  tableData = payTimeTableConvert(allData);
  tableData = tableData.filter(checkStartDate);
  loadData()
})

//根据时间排序
const sortTimeButton = document.getElementById("paytime-table-sort-by-time");
sortTimeButton.addEventListener('click', (event) => {
  tableData = tableData.sort(compareSecondParty("time"));
  loadData();
})


//根据乙方排序
const sortSecondParty = document.getElementById("paytime-table-sort-by-second-party");
sortSecondParty.addEventListener('click', (event) => {
  tableData.sort(compareSecondParty("secondParty"));
  loadData();
})

function compareSecondParty(property) {
  return function (obj1, obj2) {
    var value1 = obj1[property];
    var value2 = obj2[property];
    return value1.localeCompare(value2)
  }
}

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
      "<td>" + ((tableData[d].amount)) + "</td>" +
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


// 打印预览
const printPreview = document.getElementById('pay-time-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', [tableData, ""])
  const modalPath = path.join('file://', __dirname, '../../sections/contractWindows/payTimeTablePrintPreview.html')
  let win = new BrowserWindow({ width: 800, height: 1000 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  // win.webContents.openDevTools();
  win.show()
})



function payTimeTableConvert(allData) {
  var tableData = [];
  var d = 0
  for (d in allData) {
    var s = 0;
    for (s in allData[d].stages) {
      tableData.push({ "contractNumber": allData[d].contractNumber, "secondParty": allData[d].secondParty, "amount": allData[d].stages[s].amount, "time": allData[d].stages[s].time })
    }
  }
  return tableData;
}


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