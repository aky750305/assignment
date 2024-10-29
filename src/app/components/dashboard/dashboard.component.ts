import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DetailsComponent } from '../details/details.component';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialog
} from "@angular/material/dialog";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dataSource = [
    {name: 'ABC'},
    {name: 'DEF'} 
  ];
  displayedColumns: string[]= [ 'name', 'action'];
  matDialogRef: any;
  constructor(
    // private matDialogRef: MatDialogRef,
    private matDialog: MatDialog
  ) {}

  addData() {
    // console.log('addData');
    this.OpenModal();
  }

  OpenModal() {
    this.matDialogRef = this.matDialog.open(DetailsComponent, {
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe((res:any) => {
      if ((res == true)) {
        // this.name = "";
      }
    });
  }

}
