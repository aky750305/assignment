import { Component } from '@angular/core';
// import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent {
  dataSource = [];
  
  logout() {
    console.log('logout');
  }
}
