import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent implements OnInit {
  storeData: any;
  i18nLang: any;
  constructor(
    private router: Router,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    const retrievedObject: any = localStorage.getItem('userData');
    this.storeData = JSON.parse(retrievedObject);
    this.i18nLang = localStorage.getItem('i18nLang');
  }

  onChange(event: Event) {
    const selectedVal = (event.target as HTMLInputElement).value
    this.translate.use(selectedVal);
    localStorage.setItem('i18nLang', selectedVal);
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigateByUrl('/');
  }
}
