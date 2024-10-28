import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FetchDataService } from '../../services/fetch-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [FetchDataService]
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private fetchService: FetchDataService,
    private toastr: ToastrService
  ) {}

  login() {
    if (this.form.valid) {
      this.fetchService.loginUser(this.form.value).subscribe({
        next: (res) => {
          if(res.length) {
            this.toastr.success('success', 'Login Successfully',{
              timeOut: 3000,
            });
            this.router.navigateByUrl('/dashboard');
          } else {
            this.toastr.error('Invalid Credentials', 'Please enter valid credentials', {
              timeOut: 3000,
            });
          }
        },
        error: (err) => {
          this.toastr.error('Invalid Credentials', 'Please enter valid credentials',{
            timeOut: 3000,
          });
        }
      })
    }
  }

  errorMessage(type: String) {
    return `${type} is required.`
  }

}
