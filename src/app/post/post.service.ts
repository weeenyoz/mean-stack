import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];

  private backendUrl: String = environment.apiUrl + 'posts';

  constructor( 
    private http: HttpClient, 
    private router: Router
  ) { }

  // listen to post created subject
  getPostCreatedListener() {
    return this.postUpdated.asObservable();
  }

  createPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    return this.http.post<{message: String, postId: string}>(`${this.backendUrl}/new`, post).subscribe(
      res => {
        post.id = res.postId;
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["list"]);
        return res;
      },
      error => {
        console.log('Angular : ' + error);
      }
    );
  }

  getPosts() {
    return this.http.get<{message: String, posts: any}>(`${this.backendUrl}`).pipe(
      map(
        postData => {
          const { posts, message } = postData;
          const allPosts = posts.map(post => {
            const {_id, title, content, creator} = post;
            return {
              id: _id,
              title: title,
              content: content,
              creator: creator
            }
          });
          return {posts: allPosts, message: message};
        },
        error => console.log(error)
      )
    )
    .subscribe(
      postData => {
        this.posts = postData.posts;
        this.postUpdated.next([...this.posts]);
      },
      error => {
        console.log(error);
      }
    );
  }

  getPost(postId: string) {
    return this.http.get(`${this.backendUrl}/edit/${postId}`);
  }

  editPost(postId: string, title: string, content: string) {
    const post: Post = {
      id: postId,
      title: title,
      content: content
    }
    this.http.put(`${this.backendUrl}/edit/` + postId, post)
    .subscribe(
      (res: {message: string, updatedPost: Post}) => {
        const { updatedPost } = res;
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === updatedPost.id);
        updatedPosts[oldPostIndex] = updatedPost;
        this.posts = [...updatedPosts]
        this.postUpdated.next([...this.posts]);
        this.router.navigate(["/list"]);
      },
      error => console.log(error)
    )
  }

  deletPost(postId: string) {
    return this.http.delete(`${this.backendUrl}/delete/${postId}`).subscribe(
      res => {
        this.getPosts();
      },
      error => console.log('ERROR * ', error)
    )
  }
}
