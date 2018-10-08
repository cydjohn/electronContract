import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Contract } from '../../contract';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pay-time-table',
  templateUrl: './pay-time-table.component.html',
  styleUrls: ['./pay-time-table.component.scss']
})
export class PayTimeTableComponent implements OnInit {

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
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

  displayedColumns: string[] = ['index', 'contractNumber', 'firstParty', 'secondParty', 'startTime', 'carType', 'quantity'];
  dataSource = new MatTableDataSource(this.tableData);
  @ViewChild(MatSort) sort: MatSort;
}
