import { Component, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FetchDataService } from '../../services/fetch-data.service';
import { DetailsComponent } from '../details/details.component';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, ModalModule, NgxSpinnerModule, DetailsComponent, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [FetchDataService, BsModalService, TranslatePipe]
})
export class DashboardComponent implements OnInit {
  // modalRef: BsModalRef;
  @Input() storeData: any;
  dataSource: any;
  displayedColumns: string[]= [ 'name', 'action'];
  inputData: any;

  constructor(
    private fetchService: FetchDataService,
    private spinner: NgxSpinnerService,
    public modalService: BsModalService,
    public modalRef: BsModalRef,
    public translate: TranslatePipe
  ) {}

  ngOnInit(): void {
    this.getListData();
  }

  getListData() {
    this.spinner.show();
    this.dataSource = [];
    this.fetchService.listingData({type: this.storeData.type, id: this.storeData.id}).subscribe({
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

  OpenModal(template: TemplateRef<any>, data?: any) {
    this.inputData = data;
    this.modalRef = this.modalService.show(template); 
  }

  closeModal() {
    this.inputData = null;
    this.modalRef.hide();
  }

  updateTable() {
    this.inputData = null;
    this.modalRef.hide();
    this.getListData();
  }

  deleteData(element: any) {
    this.spinner.show();
    this.fetchService.listingData({type: this.storeData.type, deleteId: element.id}).subscribe({
      next: (res) => {
        this.getListData();
      },
      error: (err) => {
        this.spinner.hide();
      }
    })
  }

}
