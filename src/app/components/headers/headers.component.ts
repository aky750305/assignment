import { Component } from '@angular/core';
// import {MatDividerModule} from '@angular/material/divider';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent {
  dataSource = [];
  constructor (
    private router: Router
    ){}
  logout() {
    this.router.navigateByUrl('/');
  }
}
