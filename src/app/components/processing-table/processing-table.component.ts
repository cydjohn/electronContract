import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';
import { Contract } from '../../contract';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-processing-table',
  templateUrl: './processing-table.component.html',
  styleUrls: ['./processing-table.component.scss']
})
export class ProcessingTableComponent implements OnInit {

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

}
