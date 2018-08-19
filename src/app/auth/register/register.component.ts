import { MatSnackBar } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  submitUser() {
    this.http.post('/auth/register', this.registerForm.value).subscribe(
      (res:any) => {
        if (res.success) {
          this.router.navigate(['/auth/login'])
        }
        else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      err => {
        this.snackBar.open(err.message, '', { duration: 1000 });
      }
    );
  }

  ngOnInit() {
    if (sessionStorage.token) {
      this.router.navigate(['/home']);
    }
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      passEnter: ['', Validators.required],
      passConfirm: ['', Validators.required]
    });
  }

}
