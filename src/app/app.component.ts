import { Component, OnInit } from '@angular/core';
import { Post } from './post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mean-course';
  posts: Post[] = [];

  constructor() {}

  ngOnInit() {}

  onAddedNewPosts(post: Post) {
    this.posts.push(post);
  }

}
