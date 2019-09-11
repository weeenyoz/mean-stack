import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  newPosts: Post[] = [];
  isEditPost: boolean;
  isLoading: boolean = false;

  userIsAuthenticatedListenerSubscription: Subscription;
  userIsAuthenticated: boolean = false;

  constructor(
    private postService: PostService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPosts();
    this.postService.getPostCreatedListener().subscribe(
      posts => {
        this.isLoading = false;
        this.newPosts = posts;
      }
    );

    this.userIsAuthenticated = this.loginService.getAuthenticatedStatus();

    this.userIsAuthenticatedListenerSubscription = this.loginService.getUserAuthenticationSubject().subscribe(
      userIsAuthenticated => this.userIsAuthenticated = userIsAuthenticated
    );
  }

  ngOnDestroy() {
    this.userIsAuthenticatedListenerSubscription.unsubscribe();
  }

  deletePost(postId: string) {
    this.postService.deletPost(postId);
  }


}
