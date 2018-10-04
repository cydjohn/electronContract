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
    contractNumber: "asdf",
    firstParty: "adf",
    secondParty: "adf",
    startTime: "",
    carType: "",
    quantity: 0,
    stageSum: 0,
    amountSum: 0,
    stages: []
  }


  newStageData:Stage = {
    amount: 0, 
    time: "" 
  }

  addNewStage(newStageData, doDelete) {
    console.log(newStageData);
    this.contract.stages.push(newStageData);
  }

  addNewContract() {
    console.log("adfaskdfhakshdfkl");
    console.log(this.contract.contractNumber);
  }

}
