import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeadersComponent } from '../headers/headers.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [DashboardComponent, HeadersComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  storeData: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    const retrievedObject: any = localStorage.getItem('userData');
    this.storeData = JSON.parse(retrievedObject);
    if (!this.storeData?.id) {
      this.router.navigateByUrl('/');
    }
  }
}
