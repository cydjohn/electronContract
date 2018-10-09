import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from '../../contract';
import { DeleteContractComponent } from '../delete-contract/delete-contract.component'
import { MatTableDataSource, MatSort } from '@angular/material';
import { ElectronService } from '../../providers/electron.service';
import { ContractDetailComponent } from '../contract-detail/contract-detail.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {

  constructor(private modalService: NgbModal,
    private electronService: ElectronService) {
  }

  ngOnInit() {
    this.calculateSum();
    this.dataSource.sort = this.sort;
  }

  showDetail(rowData) {
    this.modalService.open(ContractDetailComponent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
    this.electronService.remote.dialog.showSaveDialog({
      title: '导出总表',
      defaultPath: '~/总表.xlsx'
    }, function (result) {
      console.log(result)
      /* html表格转excel */
      var wb = XLSX.utils.table_to_book(document.getElementById('main-table'));
      /* 生成文件，导出D盘 */
      XLSX.writeFile(wb, result);
    });
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

  displayedColumns: string[] = ['index', 'contractNumber', 'firstParty', 'secondParty', 'startTime', 'carType', 'quantity', 'stageSum'];
  dataSource = new MatTableDataSource(this.tableData);
  @ViewChild(MatSort) sort: MatSort;
}
