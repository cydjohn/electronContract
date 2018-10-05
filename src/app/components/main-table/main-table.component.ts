import { Component, OnInit } from '@angular/core';
import { Contract } from '../../contract';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.calculateSum();
  }

  showDetail(rowData) {
    console.log(rowData);
    
  }

  calculateSum() {
    for (let d in this.tableData) {
      this.amountSum += this.tableData[d].stageSum;
    }
  }

  amountSum = 0

  tableData: Contract[] = [
    {
      contractNumber: "fasfasdf",
      firstParty: "adsf",
      secondParty: "fasdf",
      startTime: "fdsa",
      carType: "fasd",
      quantity: 10,
      stageSum: 10,
      amountSum: 10,
      stages: []
    },
    {
      contractNumber: "fasfasdf",
      firstParty: "adsf",
      secondParty: "fasdf",
      startTime: "fdsa",
      carType: "fasd",
      quantity: 10,
      stageSum: 10,
      amountSum: 10,
      stages: []
    }
  ]

}
