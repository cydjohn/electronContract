import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Contract } from '../../contract';
import * as XLSX from 'xlsx';
export interface payTimeTbaleData {
  contractNumber: string;
  firstParty: string;
  secondParty: string;
  amount: string;
  time: string;
}
@Component({
  selector: 'app-pay-time-table',
  templateUrl: './pay-time-table.component.html',
  styleUrls: ['./pay-time-table.component.scss']
})
export class PayTimeTableComponent implements OnInit {

  amountSum = 0
  tableData: Contract[] = []
  displayedColumns: string[] = ['index', 'contractNumber', 'firstParty', "secondParty", 'amount', 'time'];
  
  tempData:payTimeTbaleData[] = []
  dataSource = new MatTableDataSource(this.tempData);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;

    this.electronService.ipcRenderer.send('request-all-data');
    this.electronService.ipcRenderer.on('get-all-data', (event, arg) => {
      this.tableData = arg;
      //temp
      this.dataSource = new MatTableDataSource(this.payTimeTableConvert(this.tableData));
    });

    this.electronService.ipcRenderer.on('add-new-contract', (event, arg) => {
      this.tableData.push(arg);
      this.dataSource = new MatTableDataSource(this.payTimeTableConvert(this.tableData));
    });
  }

  payTimeTableConvert(allData) {
    var tableData = [];
    var d = 0
    for (let d in allData) {
      var s = 0;
      for (let s in allData[d].stages) {
        tableData.push({ "contractNumber": allData[d].contractNumber, "firstParty": allData[d].firstParty, "secondParty": allData[d].secondParty, "amount": allData[d].stages[s].amount, "time": allData[d].stages[s].time })
      }
    }
    return tableData;
  }

  exportExcel() {
    this.electronService.remote.dialog.showSaveDialog({
      title: '导出付款时间表',
      defaultPath: '~/付款时间表.xlsx'
    }, function (result) {
      /* html表格转excel */
      var wb = XLSX.utils.table_to_book(document.getElementById('pay-time-table'));
      /* 生成文件，导出D盘 */
      XLSX.writeFile(wb, result);
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSum() {
    return this.dataSource.filteredData.map(t => t.amount).reduce((acc, value) => parseFloat(acc.toString()) + parseFloat(value.toString()), 0);
  }
}
