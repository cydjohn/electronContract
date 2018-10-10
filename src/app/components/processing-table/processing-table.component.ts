import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { Contract } from '../../contract';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-processing-table',
  templateUrl: './processing-table.component.html',
  styleUrls: ['./processing-table.component.scss']
})
export class ProcessingTableComponent implements OnInit {


  amountSum = 0
  tableData: Contract[] = []
  displayedColumns: string[] = ['index', 'contractNumber', 'secondParty', 'payedMoney', 'unpayedMoney', 'counter'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    this.electronService.ipcRenderer.send('request-all-data');
    this.electronService.ipcRenderer.on('get-all-data', (event, arg) => {
      this.tableData = arg;
      //temp
      this.dataSource = new MatTableDataSource(this.convertProcessingTableData(this.tableData));
      this.dataSource.sort = this.sort;
    });

    this.electronService.ipcRenderer.on('add-new-contract', (event, arg) => {
      this.tableData.push(arg);
      this.dataSource = new MatTableDataSource(this.convertProcessingTableData(this.tableData));
      this.dataSource.sort = this.sort;
    });
  }

  convertProcessingTableData(allData) {
    var tableData = [];
    var a = 0;
    for (let a in allData) {
      var s = 0;
      var counter = 0;
      var payedMoney = 0;
      var unpayedMoney = 0;
      for (let s in allData[a].stages) {
        if (moment(new Date()).isBefore(moment(allData[a].stages[s].time))) {
          counter += 1;
          unpayedMoney += parseFloat(allData[a].stages[s].amount);
        }
        else {
          payedMoney += parseFloat(allData[a].stages[s].amount);
        }

      }
      if (counter > 0) {
        tableData.push({ "contractNumber": allData[a].contractNumber, "secondParty": allData[a].secondParty, "payedMoney": payedMoney, "unpayedMoney": unpayedMoney, "counter": counter })
      }
    }
    return tableData;
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

}
