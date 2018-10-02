import { Component, OnInit } from '@angular/core';
import { Contract } from '../../contract';

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  contract: Contract = {
    contractNumber: "",
    firstParty: "",
    secondParty: "",
    startTime: "",
    carType: "",
    quantity: 0,
    stageSum: 0,
    amountSum: 0
  }


  addNewContract() {
    console.log("adfaskdfhakshdfkl");
    console.log(this.contract.contractNumber);
  }

}
