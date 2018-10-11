import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { Contract } from '../../contract';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-finished-table',
  templateUrl: './finished-table.component.html',
  styleUrls: ['./finished-table.component.scss']
})
export class FinishedTableComponent implements OnInit {

  amountSum = 0
  tableData: Contract[] = []
  displayedColumns: string[] = ['index', 'contractNumber', 'secondParty', 'stageSum', 'time'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.electronService.ipcRenderer.send('request-all-data');
    this.electronService.ipcRenderer.on('get-all-data', (event, arg) => {
      this.tableData = arg;
      //temp
      this.dataSource = new MatTableDataSource(this.convertFinishedTableData(this.tableData));
      this.dataSource.sort = this.sort;
    });

    this.electronService.ipcRenderer.on('add-new-contract', (event, arg) => {
      this.tableData.push(arg);
      this.dataSource = new MatTableDataSource(this.convertFinishedTableData(this.tableData));
      this.dataSource.sort = this.sort;
    });
  }

  convertFinishedTableData(allData) {
    var tableData = [];
    var a = 0;
    for (let a in allData) {
      var s = 0;
      for (let s in allData[a].stages) {
        var isFinished = false;
        var lastDay = allData[a].stages[s].time;
        if (moment(new Date()).isBefore(moment(allData[a].stages[s].time))) {
          isFinished = false;
          break;
        }
        else {
          isFinished = true;
        }
        if (moment(lastDay).isBefore(moment(allData[a].stages[s].time))) {
          lastDay = allData[a].stages[s].time;
        }
      }
      if (isFinished) {
        tableData.push({ "contractNumber": allData[a].contractNumber, "secondParty": allData[a].secondParty, "stageSum": allData[a].stageSum, "time": lastDay })
      }
    }
    return tableData;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportExcel() {
    this.electronService.remote.dialog.showSaveDialog({
      title: '导出已完成表',
      defaultPath: '~/已完成表.xlsx'
    }, function (result) {
      console.log(result)
      /* html表格转excel */
      var wb = XLSX.utils.table_to_book(document.getElementById('finished-table'));
      /* 生成文件，导出D盘 */
      XLSX.writeFile(wb, result);
    });
  }

}
