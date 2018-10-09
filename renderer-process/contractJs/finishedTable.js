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
  finishedTableData = convertFinishedTableData(finishedAllData);
  // console.log(finishedTableData);
  loadData();
})


// 删除成功更新表内容
ipcRenderer.on('delete-contract-number', (event, arg) => {
  finishedAllData = finishedAllData.filter(function (item) {
    return item.contractNumber !== arg
  })
  finishedTableData = finishedTableData.filter(function (item) {
    return item.contractNumber !== arg
  })
  loadData()
})

function convertFinishedTableData(allData) {
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
      tableData.push({ "contractNumber": allData[a].contractNumber, "secondParty": allData[a].secondParty, "stageSum": allData[a].stageSum, "time": lastDay })
    }
  }
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
  finishedTableData = convertFinishedTableData(finishedAllData.filter(checkContractNumber));
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
      "<td>" + toAccountingBookkeepingFormat(finishedTableData[d].stageSum) + "</td>" +
      "<td>" + finishedTableData[d].time + "</td>" +
      "</tr>"
  }
}

// 按照乙方排序
const sortBySecondPartyButton = document.getElementById("finished-table-sort-by-second-party");

sortBySecondPartyButton.addEventListener('click', (event) => {
  finishedTableData = finishedTableData.sort(compare("secondParty"));
  loadData();
})

function compare(property) {
  return function (obj1, obj2) {
    var value1 = obj1[property];
    var value2 = obj2[property];

    return value1.localeCompare(value2)
    // return moment(value1).isAfter(moment(value2));


  }
}


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