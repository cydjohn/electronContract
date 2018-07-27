const { BrowserWindow, dialog } = require('electron').remote
const path = require('path')
const { ipcRenderer } = require('electron')
var moment = require('moment');
// const newWindowBtn = document.getElementById('new')

const XLSX = require('xlsx')

let processingAllData = []

let processingTableData = []
// loadData()

ipcRenderer.send('request-all-data')

ipcRenderer.on('get-all-data', (event, arg) => {
    processingAllData = arg;

    //temp
    processingTableData = processingAllData;
    // console.log(processingTableData);
    loadData();
})

// 搜索合同号
const contraIdSearchBox = document.getElementById("processing-contract-id")
function checkContractNumber(bn,arr) {
  if (contraIdSearchBox.value == "") {
    return false
  }
  else if (contraIdSearchBox.value == "*") {
    return true
  }
  console.log(bn.contractNumber)
  return bn.contractNumber.search(contraIdSearchBox.value) != -1
}

contraIdSearchBox.addEventListener("input", () => {
  processingTableData = processingAllData.filter(checkContractNumber);
  loadData()
})




function loadData() {
    document.getElementById('processing-table-data').innerHTML = ""
    var d = 0
    for (d in processingTableData) {
        var s = 0;
        var counter = 0;
        var payedMoney = 0;
        var unpayedMoney = 0;
        for (s in processingTableData[d].stages) {
            if (moment(new Date()).isBefore(moment(processingTableData[d].stages[s].time))) {
                counter += 1;
                unpayedMoney += parseFloat(processingTableData[d].stages[s].amount);
            }
            else {
                payedMoney += parseFloat(processingTableData[d].stages[s].amount);
            }
        }
        if (counter>0) {
            document.getElementById('processing-table-data').innerHTML +=
                "<tr>" +
                "<td>" + (parseInt(d) + 1) + "</td>" +
                "<td>" + processingTableData[d].contractNumber + "</td>" +
                "<td>" + processingTableData[d].secondParty + "</td>" +
                "<td>" + payedMoney.toFixed(2) + "</td>" +
                "<td>" + unpayedMoney.toFixed(2) + "</td>" +
                "<td>" + counter + "</td>" +
                "</tr>"
        }
    }
}

