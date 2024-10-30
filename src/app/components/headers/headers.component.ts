import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [NgIf],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent implements OnInit {
  storeData: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    const retrievedObject: any = localStorage.getItem('userData')
    this.storeData = JSON.parse(retrievedObject);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
