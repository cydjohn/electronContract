const { ipcRenderer, remote } = require('electron');
var moment = require('moment')
const path = require('path')
const { BrowserWindow } = require('electron').remote



ipcRenderer.send('request-temp-data')
const confirmSign = document.getElementById('confirm-sign')
ipcRenderer.on('get-temp-data', (event, arg) => {
    loadData(arg)
})


function loadData(contract) {
    const contractNumber = document.getElementById("new-contract-number");
    const firstParty = document.getElementById("new-contract-first-party");
    const secondParty = document.getElementById("new-contract-second-party");
    const startTime = document.getElementById("new-contract-start-time");
    const carType = document.getElementById("new-contract-car-type");
    const carQuantity = document.getElementById("new-contract-car-quantity");
    const stageSum = document.getElementById("new-contract-stage-sum");
    const amountSum = document.getElementById("new-amount-sum");
    var stages = [];

    contractNumber.value = contract.contractNumber;
    firstParty.value = contract.firstParty;
    secondParty.value = contract.secondParty;
    startTime.value = contract.startTime;
    carType.value = contract.carType;
    carQuantity.value = contract.carQuantity;
    amountSum.value = toAccountingBookkeepingFormat(contract.stageSum);
    loadStages(contract.stages);

}

function loadStages(stages) {
    for (i in stages) {
        document.getElementById('new-stages').innerHTML +=
            '<div class="row col-lg-12 col-md-12 m-1">' +
            '<div class="input-group col-lg-2 col-md-2">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text"> 期数：</span>' +
            '</div >' +
            '<input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value = ' + (parseInt(i) + 1) + ' disabled="disabled" id="stages-input-' + i + '">' +
            '</div>' +

            '<div class="input-group col-lg-5 col-md-5">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text">付款时间：</span>' +
            '</div>' +
            '<input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value = "' + stages[i].time + '" id="time-input-' + i + '">' +
            '</div>' +


            '<div class="input-group col-lg-4 col-md-4">' +
            '<div class="input-group-prepend">' +
            '<span class="input-group-text">付款金额：</span>' +
            '</div>' +
            '<input type="float" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value = "' + toAccountingBookkeepingFormat(stages[i].amount) + '" id="amount-input-' + i + '">' +
            '</div>' +
            '</div> ';
    }
}







const printPDFBtn = document.getElementById('print-pdf')

printPDFBtn.addEventListener('click', (event) => {
    console.log('asdfafasdfadsf')

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