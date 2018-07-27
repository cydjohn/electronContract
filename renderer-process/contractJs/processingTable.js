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
    tableData = allData;
    // console.log(tableData);
    loadData();
})



function loadData() {
    document.getElementById('processing-table-data').innerHTML = ""
    var d = 0
    for (d in tableData) {
        var s = 0;
        var counter = 0;
        var payedMoney = 0;
        var unpayedMoney = 0;
        for (s in tableData[d].stages) {
            if (moment(new Date()).isBefore(moment(tableData[d].stages[s].time))) {
                counter += 1;
                unpayedMoney += tableData[d].stages[s].amount
            }
            else {
                payedMoney += tableData[d].stages[s].amount;
            }
        }
        if (counter>0) {
            document.getElementById('processing-table-data').innerHTML +=
                "<tr>" +
                "<td>" + (parseInt(d) + 1) + "</td>" +
                "<td>" + tableData[d].contractNumber + "</td>" +
                "<td>" + tableData[d].secondParty + "</td>" +
                "<td>" + payedMoney + "</td>" +
                "<td>" + unpayedMoney + "</td>" +
                "<td>" + counter + "</td>" +
                "</tr>"
        }
    }
}

