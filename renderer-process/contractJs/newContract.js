const { ipcRenderer, remote } = require('electron');
var moment = require('moment')
const path = require('path')
const { BrowserWindow } = require('electron').remote

const addNewContractButton = document.getElementById("add-new")

const addNewStageButton = document.getElementById("add-stages")

var stages = []

addNewStageButton.addEventListener('click', () => {
    addNewStage();

})


function addNewStage() {
    getStages();
    document.getElementById('stages').innerHTML = "";
    
    // 查看上一期有没有填写数据
    if (stages.length == 0 || (stages[stages.length-1].time != "" && stages[stages.length-1].amount != "")) {
        var i = 0;
        // console.log(stages);
        stages.push({ "time": "", "amount": "", "stageId": 0 })
        for (i in stages) {
            document.getElementById('stages').innerHTML +=
                '<div class="row col-lg-12 col-md-12 m-1">' +
                '<div class="input-group col-lg-2 col-md-2">' +
                '<div class="input-group-prepend">' +
                '<span class="input-group-text"> 期数：</span>' +
                '</div >' +
                '<input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" value = ' + i + ' disabled="disabled" id="stages-input-' + i + '">' +
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

function getStages() {
    var i = 0;
    for (i = 0; i < stages.length; i++) {
        console.log(i);
        stages[i].time = document.getElementById('time-input-' + i).value;
        stages[i].amount = document.getElementById('amount-input-' + i).value;
        stages[i].stageId = i;
        // console.log(document.getElementById('time-input-' + i).value);
        // console.log(document.getElementById('amount-input-' + i).value);
    }
}
