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
  }

  showDetail(rowData) {
    console.log(rowData);
  }

  tableData: Contract[] = [{
    contractNumber: "fasfasdf",
    firstParty: "adsf",
    secondParty: "fasdf",
    startTime: "fdsa",
    carType: "fasd",
    quantity: 10,
    stageSum: 10,
    amountSum: 10,
    stages: []
  }]

}
