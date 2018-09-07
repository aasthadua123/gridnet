import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  logUser() {
    this.http.post('/auth/login', { username: this.loginForm.value.username, password: this.loginForm.value.password }).subscribe(
      (res: any) => {
        if (res.success) {
          sessionStorage.token = res.token;
          this.fetchProfile();
        } else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      err => {
        this.snackBar.open(err, '', { duration: 1000 });
      }
    );

  }

  ngOnInit() {
    if (sessionStorage.token) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  fetchProfile() {
    this.http.get('/auth/status', { headers: { 'x-access-token': sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          sessionStorage.userid = res.data.id;
          this.router.navigate(['/home']);
        } else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      err => {
        this.snackBar.open(err, '', { duration: 1000 });
      }
    );
  }

}
