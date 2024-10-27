import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeadersComponent } from '../headers/headers.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [DashboardComponent, HeadersComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
