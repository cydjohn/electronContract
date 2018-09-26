import { Component, OnInit } from '@angular/core';

import { ElectronService } from '../../providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private location: Location) {

  }

  ngOnInit() {
  }

  openNewWindow() {
    this.electronService.ipcRenderer.send('pass-print-value', ["interestDateTableData, interestDate.value"])
    // const modalPath = this.location.normalize('file://' + __dirname + '../../sections/windows/interest-date-table-print-preview.html')
    const modalPath = this.location.normalize('../tables/tables.component.html')
    let win = new this.electronService.remote.BrowserWindow({ width: 1000, height: 1000 })
    win.webContents.openDevTools()
    win.on('close', () => { win = null })
    win.loadURL(modalPath)
    win.show()
  }
}