const { ipcRenderer, remote } = require('electron');
var moment = require('moment')
const path = require('path')
const { BrowserWindow } = require('electron').remote

const contractNumber = document.getElementById("new-contract-number");
const firstParty = document.getElementById("new-contract-first-party");
const secondParty = document.getElementById("new-contract-second-party");
const startTime = document.getElementById("new-contract-start-time");
const carType = document.getElementById("new-contract-car-type");
const carQuantity = document.getElementById("new-contract-car-quantity");
const stageSum = document.getElementById("new-contract-stage-sum");
const amountSum = document.getElementById("new-amount-sum");


const addNewStageButton = document.getElementById("add-stages");
var stages = [];
const alertLabel = document.getElementById('alertLabel')
alertLabel.hidden = true

const addNewContractButton = document.getElementById("add-new");

clearFrom();
// 添加新合同
addNewContractButton.addEventListener('click', () => {
    if (contractNumber.value.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "合同号不能为空";
    }
    else if (firstParty.value.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "甲方不能为空";
    }
    else if (secondParty.value.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "乙方不能为空";
    }
    else if (startTime.value.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "开始时间不能为空";
    }
    else if (carType.value.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "车辆型号不能为空";
    }
    else if (carQuantity.value.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "车辆数量不能为空";
    }
    else if (stageSum.value.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "合同总金额不能为空";
    }
    else if (stages.length == 0) {
        alertLabel.hidden = false;
        alertLabel.innerHTML = "请录入至少一期";
    }
    else {
        addNewStage();
        if (stageSum.value != amountSum.value) {
            alertLabel.hidden = false;
            alertLabel.innerHTML = "总金额不一致，请检查输入";
        }
        else {
            alertLabel.hidden = true;
            var contract = {};
            contract.contractNumber = contractNumber.value;
            contract.firstParty = firstParty.value;
            contract.secondParty = secondParty.value;
            contract.startTime = startTime.value;
            contract.carType = carType.value;
            contract.carQuantity = carQuantity.value;
            contract.stageSum = stageSum.value;
            stages.pop();
            contract.stages = stages;
            // console.log(contract.stages);
            ipcRenderer.send('getMsg', contract)
            clearFrom();
        }
    }
})

//添加一个stage
addNewStageButton.addEventListener('click', () => {
    addNewStage();
})
function addNewStage() {
    addStages();
    // 查看上一期有没有填写数据
    if (stages.length == 0 || (stages[stages.length - 1].time != "" && stages[stages.length - 1].amount != "")) {
        document.getElementById('new-stages').innerHTML = "";
        var i = 0;
        // console.log(stages);
        stages.push({ "time": "", "amount": "", "stageId": 0 });
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
                '<input type="float" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value = "' + stages[i].amount + '" id="amount-input-' + i + '">' +
                '</div>' +
                '</div> ';
        }
    }
}

function addStages() {
    var i = 0;
    var sum = 0;
    for (i = 0; i < stages.length; i++) {
        if (document.getElementById('amount-input-' + i).value > 0) {
            stages[i].time = document.getElementById('time-input-' + i).value;
            stages[i].amount = document.getElementById('amount-input-' + i).value;
            stages[i].stageId = i;
            sum += parseFloat(stages[i].amount);
        }
        // console.log(document.getElementById('time-input-' + i).value);
        // console.log(document.getElementById('amount-input-' + i).value);
    }
    amountSum.value = sum
}

function clearFrom() {
    contractNumber.value = "";
    firstParty.value = "";
    secondParty.value = "";
    startTime.value= "";
    carType.value = "";
    carQuantity.value = 0;
    stageSum.value = 0;
    amountSum.value = 0;
    stages = [];
    document.getElementById('new-stages').innerHTML = "";
}
