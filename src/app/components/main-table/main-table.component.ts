import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from '../../contract';
import { DeleteContractComponent } from '../delete-contract/delete-contract.component'
import { Sort, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  constructor(private modalService: NgbModal) {
    // this.sortedData = this.tableData.slice();
  }

  ngOnInit() {
    this.calculateSum();
    this.dataSource.sort = this.sort;
  }


  showDetail(rowData) {
    this.modalService.open(DeleteContractComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  calculateSum() {
    // for (let d in this.tableData) {
    //   this.amountSum += this.tableData[d].stageSum;
    // }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportExcel() {

  }

  // sortData(sort: Sort) {
  //   const data = this.tableData.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'contractNumber': return compare(a.contractNumber, b.contractNumber, isAsc);
  //       case 'firstParty': return compare(a.firstParty, b.firstParty, isAsc);
  //       case 'secondParty': return compare(a.secondParty, b.secondParty, isAsc);
  //       case 'startTime': return compare(a.startTime, b.startTime, isAsc);
  //       case 'carType': return compare(a.carType, b.carType, isAsc);
  //       case 'quantity': return compare(a.quantity, b.quantity, isAsc);
  //       case 'stageSum': return compare(a.stageSum, b.stageSum, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  delete() {
    this.modalService.open(DeleteContractComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  amountSum = 0

  sortedData: Contract[] = []
  t: Contract[] = [
    {
      contractNumber: "2018(2)",
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
      contractNumber: "2018(1)",
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

  displayedColumns: string[] = ['contractNumber', 'firstParty', 'secondParty', 'startTime', 'carType', 'quantity', 'stageSum'];
  dataSource = new MatTableDataSource(this.t);
  @ViewChild(MatSort) sort: MatSort;

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}