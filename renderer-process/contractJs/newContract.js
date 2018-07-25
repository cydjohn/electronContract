const { ipcRenderer, remote } = require('electron');
var moment = require('moment')
const path = require('path')
const { BrowserWindow } = require('electron').remote

const addNewContractButton = document.getElementById("add-new")

const addNewStageButton = document.getElementById("add-stages")


addNewStageButton.addEventListener('click', () => {
    console.log("adsfasdfas");
    addNewStage();

})


function addNewStage() {
    // document.getElementById('add-stages').innerHTML = "";
    document.getElementById('stages').innerHTML +=
        '<div class="row col-lg-12 col-md-12 m-1">' +
        '<div class="input-group col-lg-2 col-md-2">' +
        '<div class="input-group-prepend">' +
        '<span class="input-group-text"> 期数：</span>'+
            '</div >'+
        '<input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="stages-input">' +
        '</div>' +

        '<div class="input-group col-lg-5 col-md-5">' +
            '<div class="input-group-prepend">'+
                '<span class="input-group-text">付款时间：</span>'+
            '</div>' +
            '<input type="date" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="time-input">' +
        '</div>' +


            '<div class="input-group col-lg-4 col-md-4">' +
                '<div class="input-group-prepend">' +
                    '<span class="input-group-text">付款金额：</span>' +
                '</div>' +
                '<input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" id="amount-input">'+
        '</div>' +
            '</div> '
        }
        
