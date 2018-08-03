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
    processingTableData = convertProcessingTableData(processingAllData);
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
    processingTableData = convertProcessingTableData(processingAllData.filter(processingCheckContractNumber));
    processingTableLoadData()
})

// 按照乙方排序
const sortBySecondPartyButton = document.getElementById("processing-table-sort-by-second-party");


sortBySecondPartyButton.addEventListener('click', (event) => {
    processingTableData = processingTableData.sort(compare("secondParty"));
    processingTableLoadData();
})


function compare(property) {
    return function (obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        return value1.localeCompare(value2)
        // return moment(value1).isAfter(moment(value2));
    }
}

function convertProcessingTableData(allData) {
    var tableData = [];
    var a = 0;
    for (a in allData) {
        var s = 0;
        var counter = 0;
        var payedMoney = 0;
        var unpayedMoney = 0;
        for (s in allData[a].stages) {
            if (moment(new Date()).isBefore(moment(allData[a].stages[s].time))) {
                counter += 1;
                unpayedMoney += parseFloat(allData[a].stages[s].amount);
            }
            else {
                payedMoney += parseFloat(allData[a].stages[s].amount);
            }

        }
        if (counter > 0) {
            tableData.push({ "contractNumber": allData[a].contractNumber, "secondParty": allData[a].secondParty, "payedMoney": payedMoney, "unpayedMoney": unpayedMoney, "counter": counter })
        }
    }
    return tableData;
}


function processingTableLoadData() {
    document.getElementById('processing-table-data').innerHTML = ""
    var d = 0
    for (d in processingTableData) {

        document.getElementById('processing-table-data').innerHTML +=
            "<tr>" +
            "<td>" + (parseInt(d) + 1) + "</td>" +
            "<td>" + processingTableData[d].contractNumber + "</td>" +
            "<td>" + processingTableData[d].secondParty + "</td>" +
            "<td>" + processingTableData[d].payedMoney.toFixed(2) + "</td>" +
            "<td>" + processingTableData[d].unpayedMoney.toFixed(2) + "</td>" +
            "<td>" + processingTableData[d].counter + "</td>" +
            "</tr>"

    }
}



// 打印预览
const printPreview = document.getElementById('processing-table-print-preview')
printPreview.addEventListener('click', (event) => {
    ipcRenderer.send('pass-print-value', [processingTableData, ""])
    const modalPath = path.join('file://', __dirname, '../../sections/contractWindows/processingTablePrintPreview.html')
    let win = new BrowserWindow({ width: 800, height: 1000 })
    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    // win.webContents.openDevTools();
    win.show()
})