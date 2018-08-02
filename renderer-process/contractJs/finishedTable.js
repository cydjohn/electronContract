const { BrowserWindow, dialog } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment');
// const newWindowBtn = document.getElementById('new')

const XLSX = require('xlsx')

let finishedAllData = []

let finishedTableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
  finishedAllData = arg;

  //temp
  finishedTableData = convertTableData(finishedAllData);
  // console.log(finishedTableData);
  loadData();
})

function convertTableData(allData) {
  var tableData = [];
  var a = 0;
  for (a in allData) {
    var s = 0;
    for (s in allData[a].stages) {
      var isFinished = false;
      var lastDay = allData[a].stages[s].time;
      if (moment(new Date()).isBefore(moment(allData[a].stages[s].time))) {
        isFinished = false;
        break;
      }
      else {
        isFinished = true;
      }
      if (moment(lastDay).isBefore(moment(allData[a].stages[s].time))) {
        lastDay = allData[a].stages[s].time;
      }
    }
    if (isFinished) {
      tableData.push({ "contractNumber": allData[a].contractNumber, "secondParty": allData[a].secondParty, "stageSum": allData[a].stageSum, "time": lastDay})
    }
  }
  console.log(tableData);
  return tableData;
}


// 搜索合同号
const contraIdSearchBox = document.getElementById("finished-contract-id")

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
  finishedTableData = convertTableData(finishedAllData.filter(checkContractNumber));
  loadData()
})



function loadData() {
  document.getElementById('finished-table-data').innerHTML = ""
  var d = 0;
  var counter = 1;
  for (d in finishedTableData) {
    document.getElementById('finished-table-data').innerHTML +=
      "<tr>" +
      "<td>" + counter++ + "</td>" +
      "<td>" + finishedTableData[d].contractNumber + "</td>" +
      "<td>" + finishedTableData[d].secondParty + "</td>" +
      "<td>" + finishedTableData[d].stageSum + "</td>" +
      "<td>" + finishedTableData[d].time + "</td>" +
      "</tr>"
  }
}

// 按照乙方排序
const sortBySecondPartyButton = document.getElementById("")


// 打印预览
const printPreview = document.getElementById('finished-table-print-preview')
printPreview.addEventListener('click', (event) => {
  ipcRenderer.send('pass-print-value', [finishedTableData, ""])
  const modalPath = path.join('file://', __dirname, '../../sections/contractWindows/finishedTablePrintPreview.html')
  let win = new BrowserWindow({ width: 800, height: 1000 })
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  // win.webContents.openDevTools();
  win.show()
})
