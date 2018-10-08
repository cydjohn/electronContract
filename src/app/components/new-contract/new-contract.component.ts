import { Component, OnInit } from '@angular/core';
import { Contract } from '../../contract';
import { Stage } from '../../stage';
import { ElectronService } from '../../providers/electron.service'


@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit {

  constructor(private electronService:ElectronService) { }

  ngOnInit() {
    console.log(this.contract.stages);

  }
  alertText = ""
  contract: Contract = {
    contractNumber: "",
    firstParty: "",
    secondParty: "",
    startTime: "",
    carType: "",
    quantity: 0,
    stageSum: 0,
    amountSum: 0,
    stages: []
  }


  newStageData: Stage = {
    amount: 0,
    time: ""
  }

  addNewStage(newStageData, doDelete, row_n) {
    doDelete = doDelete === undefined ? false : doDelete;
    if (doDelete == true) {
      this.contract.stages.splice(row_n, 1);
    }
    else {
      if (newStageData.time.year) {
        this.contract.stages.push({ amount: newStageData.amount, time: newStageData.time.year + '-' + newStageData.time.month + '-' + newStageData.time.day });
      }
      else {
        this.contract.stages.push(...newStageData);
      }
    }
    this.calculateStageSum();
  }

  calculateStageSum() {
    this.contract.stageSum = 0.0;
    for (let i in this.contract.stages) {
      this.contract.stageSum += Number(this.contract.stages[i].amount);
    }
  }

  addNewContract() {
    this.electronService.ipcRenderer.send('getMsg', this.contract)
    console.log(this.contract.contractNumber);
  }

}