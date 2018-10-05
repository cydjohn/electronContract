import { Component, OnInit } from '@angular/core';
import { Contract } from '../../contract';
import { Stage } from '../../stage';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(this.contract.stages);
  }

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

  addNewStage(newStageData, doDelete) {
    doDelete = doDelete === undefined ? false : doDelete;
    if (doDelete == true) {

    }
    if (newStageData.time.year) {
      this.contract.stages.push({ amount: newStageData.amount, time: newStageData.time.year + '-' + newStageData.time.month + '-' + newStageData.time.day });
    }
    else {
      this.contract.stages.push(...newStageData);
    }
  }

  addNewContract() {

    console.log(this.contract.contractNumber);
  }

}
