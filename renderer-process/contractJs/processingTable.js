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
    processingTableLoadData();
})

// 搜索合同号
const processingContraIdSearchBox = document.getElementById("processing-contract-id")
function processingCheckContractNumber(bn) {
  if (processingContraIdSearchBox.value == "") {
    return false
  }
  else if (processingContraIdSearchBox.value == "*") {
    return true
  }
  return bn.contractNumber.search(processingContraIdSearchBox.value) != -1
}

processingContraIdSearchBox.addEventListener("input", () => {
  processingTableData = processingAllData.filter(processingCheckContractNumber);
  console.log(processingTableData);
  processingTableLoadData()
})




function processingTableLoadData() {
    document.getElementById('processing-table-data').innerHTML = ""
    var d = 0
    for (d in processingTableData) {
        var s = 0;
        var counter = 0;
        var payedMoney = 0;
        var unpayedMoney = 0;
        console.log("processingTableData");
        for (s in processingTableData[d].stages) {
            console.log("processingTableData stages");
            console.log(processingTableData[d].stages[s].time);
            if (moment(new Date()).isBefore(moment(processingTableData[d].stages[s].time))) {
                counter += 1;
                unpayedMoney += parseFloat(processingTableData[d].stages[s].amount);
            }
            else {
                payedMoney += parseFloat(processingTableData[d].stages[s].amount);
            }
        }
        console.log('counter:' + counter);

        if (counter>0) {
            console.log("processingTableData stages table");
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

