import { Component, OnInit } from '@angular/core';
import { Post } from './post/post.model';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mean-course';
  posts: Post[] = [];

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    // on init the app has to remember that the user is still logged in
    // hence, we need to refresh the app's memory: 
    // each time the app refreshes / whne the user refreshes the browser,
    // we check if the token's expired or not
    this.loginService.authoAuthData();
  }

  onAddedNewPosts(post: Post) {
    this.posts.push(post);
  }

}
