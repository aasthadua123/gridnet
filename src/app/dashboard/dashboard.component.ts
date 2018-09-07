import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  feed: any;
  requests: any;
  newPost: FormGroup;
  currentUser: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  logout() {
    this.http.get('/auth/logout', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          sessionStorage.clear();
          this.router.navigate(['/']);
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
    this.refreshFeed();
    this.getRequests();
    this.posterInit();
    this.getUserId();
  }

  refreshFeed() {
    this.http.get('/actions/feed/fetch', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.feed = res.feed;
        }
        else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      (err) => {
        this.snackBar.open(err, '', { duration: 1000 });
      }
    );
  }

  posterInit() {
    this.newPost = this.fb.group({
      content: ['']
    });
  }

  submitPost() {
    if (this.newPost.value.content != "") {
      this.http.post('/actions/post/add',
        { content: this.newPost.value.content },
        { headers: { "x-access-token": sessionStorage.token } }).subscribe(
          (res: any) => {
            if (res.success) {
              this.newPost.setValue({ content: "" });
              this.refreshFeed();
            }
            else {
              this.snackBar.open(res.msg, '', { duration: 1000 });
            }
          },
          (err) => {
            this.snackBar.open(err, '', { duration: 1000 });
          }
        );
    }
  }

  votePost(action, post) {
    let url: string;
    let checker = this.checkVote(action, post);

    if (action == 'like') {
      if (checker) {
        url = `/actions/post/unlike/${post.postid}`;
      }
      else {
        url = `/actions/post/like/${post.postid}`;
      }
    }
    else if (action == 'dislike') {
      if (checker) {
        url = `/actions/post/unlike/${post.postid}`;
      }
      else {
        url = `/actions/post/dislike/${post.postid}`;
      }
    }

    this.http.get(url, { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.refreshFeed();
        }
        else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      (err) => {
        this.snackBar.open(err, '', { duration: 1000 });
      }
    );
  }

  getRequests() {
    this.http.get('/actions/friend/fetch',
      { headers: { "x-access-token": sessionStorage.token } }).subscribe(
        (res: any) => {
          if (res.success) {
            this.requests = res.requests;
          }
          else {
            this.snackBar.open(res.msg, '', { duration: 1000 });
          }
        },
        (err) => {
          this.snackBar.open(err, '', { duration: 1000 });
        }
      );
  }

  getUserId() {
    this.http.get('/auth/status', { headers: { "x-access-token": sessionStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.currentUser = res.data.id;
        }
        else {
          this.snackBar.open(res.msg, '', { duration: 1000 });
        }
      },
      (err) => {
        this.snackBar.open(err, '', { duration: 1000 });
      }
    );
  }

  handleRequest(type, id) {
    let url: string;
    if (type == 'accept') {
      url = `/actions/friend/manage/accept/${id}`;
    }
    else if (type == 'remove') {
      url = `/actions/friend/manage/delete/${id}`
    }
    this.http.get(url,
      { headers: { "x-access-token": sessionStorage.token } }).subscribe(
        (res: any) => {
          this.snackBar.open(res.msg, '', { duration: 500 });
        },
        (err) => {
          this.snackBar.open(err, '', { duration: 1000 });
        }
      );
    this.getRequests();
  }

  checkVote(action, post) {
    let likes = post.likes.map((p) => p.id);
    let dislikes = post.dislikes.map((p) => p.id);

    if (action == 'like') {
      if (likes.includes(sessionStorage.userid)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if (action == 'dislike') {
      if (dislikes.includes(sessionStorage.userid)) {
        return true;
      }
      else {
        return false;
      }
    }
  }
}
