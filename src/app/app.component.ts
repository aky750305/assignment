import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InternetService } from './services/internet.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FetchDataService } from './services/fetch-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    TranslateModule
  ],
  providers: [InternetService, FetchDataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Health Facility';
  constructor(
    public translate: TranslateService,
    private internetStatus: InternetService,
    private dbService: NgxIndexedDBService,
    private spinner: NgxSpinnerService,
    private fetchService: FetchDataService,
    private toastr: ToastrService,
  ) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    localStorage.setItem('i18nLang', 'en');

    this.internetStatus.createOnline$().subscribe((isOnline) => {
      this.internetStatus.setInternetStatus(isOnline);

    })
  }

  ngOnInit() {}

  getIndexDBData() {
    this.dbService.getAll('data').subscribe(res => {
      if (res[0]) {
        const element: any = res[0];
        if(element?.base64String) {
          const reqData: any = this.fetchService.uploadAudioFiles(element.base64String);
          reqData.then((e: any) => {
            this.saveIndexDBData(element);
          });
        } else {
          this.saveIndexDBData(element)
        }
      }
    })
  }

  saveIndexDBData(element: any) {
    let apiCall: any;
    if (element.type === 'caregiver') {
      apiCall = element?.id
        ? this.fetchService.editCareGiver(element)
        : this.fetchService.addCareGiver(element)
    } else if (element.type === 'caregiver') {
      apiCall = element?.id
        ? this.fetchService.editPatients(element)
        : this.fetchService.addPatients(element)
    }
    apiCall.subscribe({
      next: (res: any) => {
        this.toastr.success('Data added / updated successfully', '', {
          timeOut: 3000,
        });
      },
      error: (err: any) => {
        this.toastr.error('Please try again later', '', {
          timeOut: 3000,
        });
        this.spinner.hide();
      }
    })
  }

}
