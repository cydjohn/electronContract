import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from '../../contract';
import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common'
import { DeleteContractComponent } from '../delete-contract/delete-contract.component'
import { NewContractComponent } from '../new-contract/new-contract.component'

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private location: Location,
    private modalService: NgbModal) {

  }

  ngOnInit() {
    this.calculateSum();
  }

  showDetail(rowData) {
    this.modalService.open(NewContractComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  calculateSum() {
    for (let d in this.tableData) {
      this.amountSum += this.tableData[d].stageSum;
    }
  }

  exportExcel() {

  }

  delete() {
    this.modalService.open(DeleteContractComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
