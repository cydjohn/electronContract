import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-delete-contract',
  templateUrl: './delete-contract.component.html',
  styleUrls: ['./delete-contract.component.scss']
})
export class DeleteContractComponent implements OnInit {
  contractNumber = ""
  constructor(public activeModal: NgbActiveModal, private electronService: ElectronService) { }

  ngOnInit() {
    this.electronService.ipcRenderer.on('delete-info', (event, numRemoved) => {
      console.log(numRemoved)
      if (numRemoved == 1) {
        alert("删除成功！合同号：" + this.contractNumber);
        this.activeModal.close();
      }
      else {
        alert("合同不存在！");
      }
    })
  }

  delete() {
    this.electronService.ipcRenderer.send('request-delete-contract', this.contractNumber)
    // this.activeModal.close();
  }

}
