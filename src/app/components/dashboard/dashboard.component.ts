import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FetchDataService } from '../../services/fetch-data.service';
import { DetailsComponent } from '../details/details.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, ModalModule, NgxSpinnerModule, DetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [FetchDataService, BsModalService]
})
export class DashboardComponent implements OnInit {
  // modalRef: BsModalRef;
  @Input() storeData: any;
  dataSource: any;
  displayedColumns: string[]= [ 'name', 'action'];

  constructor(
    private fetchService: FetchDataService,
    private spinner: NgxSpinnerService,
    public modalService: BsModalService,
    public modalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.getListData();
  }

  getListData() {
    this.spinner.show();
    this.fetchService.listingData({type: this.storeData.type}).subscribe({
      next: (res) => {
        this.dataSource = res;
        this.spinner.hide();
      },
      error: (err) => {
        this.dataSource = [];
        this.spinner.hide();
      }
    })
  }

  addData(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }

}
