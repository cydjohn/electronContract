import { Component, OnInit } from '@angular/core';
import { Contract } from '../../contract';
import { Stage } from '../../stage';
import { ElectronService } from '../../providers/electron.service'
import * as path from 'path';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    // console.log(this.contract.stages);
  }
  alertText = ""
  contract: Contract = {
    contractNumber: "",
    firstParty: "",
    secondParty: "",
    startTime: "",
    carType: "",
    carQuantity: null,
    stageSum: Number(),
    amountSum: null,
    stages: []
  }


  newStageData: Stage = {
    amount: null,
    time: ""
  }

  addNewStage(newStageData, doDelete, row_n) {
    doDelete = doDelete === undefined ? false : doDelete;
    if (doDelete == true) {
      this.contract.stages.splice(row_n, 1);
    }
    else {
      if (newStageData.amount) {
        if (newStageData.time.year) {
          this.contract.stages.push({ amount: newStageData.amount, time: newStageData.time.year + '-' + newStageData.time.month + '-' + newStageData.time.day });
          this.clearNewStage();
        }
        else {
          this.contract.stages.push(...newStageData);
          this.clearNewStage();
        }
      }
    }
    this.calculateStageSum();
  }

  calculateStageSum() {
    this.contract.stageSum = 0.0;
    for (let i in this.contract.stages) {
      this.contract.stageSum += Number(this.contract.stages[i].amount);
    }
    this.contract.stageSum = Number(this.contract.stageSum.toFixed(2));
  }

  addNewContract() {
    if (this.contract.contractNumber.length == 0) {
      this.alertText = "合同号不能为空";
    }
    else if (this.contract.firstParty.length == 0) {
      this.alertText = "甲方不能为空";
    }
    else if (this.contract.secondParty.length == 0) {
      this.alertText = "乙方不能为空";
    }
    else if (this.contract.startTime.length == 0) {
      this.alertText = "开始时间不能为空";
    }
    else if (this.contract.carType.length == 0) {
      this.alertText = "车辆型号不能为空";
    }
    else if (this.contract.carQuantity == 0) {
      this.alertText = "车辆数量不能为空";
    }
    else if (this.contract.stageSum == 0) {
      this.alertText = "合同总金额不能为空";
    }
    else if (this.contract.stages.length == 0) {
      this.alertText = "请录入至少一期";
    }
    else if (this.contract.stageSum != this.contract.amountSum) {
      this.alertText = "总金额不一致，请检查输入";
    }
    else {
      this.printPreView();
      this.clearForm();
    }
  }

  printPreView() {
    this.electronService.ipcRenderer.send('getMsg', this.contract);
    this.electronService.ipcRenderer.send('pass-print-value', [this.contract, ""]);
    // const modalPath = path.join('file://', __dirname, '../../../../../../../../src/app/window/newContractPrintPreview.html');
    // console.log('file://', this.electronService.remote.app.getAppPath(), '/src/app/window/newContractPrintPreview.html');
    const modalPath = path.join('file://', this.electronService.remote.app.getAppPath(), '/src/app/window/newContractPrintPreview.html');

    let win = new this.electronService.remote.BrowserWindow({ width: 800, height: 1000 });
    win.on('close', () => { win = null });
    win.loadURL(modalPath);
    // win.webContents.openDevTools();
    win.show()
  }

  clearForm() {
    this.alertText = ""
    this.contract = {
      contractNumber: "",
      firstParty: "",
      secondParty: "",
      startTime: "",
      carType: "",
      carQuantity: null,
      stageSum: null,
      amountSum: null,
      stages: []
    }
    this.clearNewStage();
  }

  clearNewStage() {
    this.newStageData = {
      amount: null,
      time: ""
    }
  }
}
