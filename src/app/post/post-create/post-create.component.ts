import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  postTitle: string;
  postContent: string;
  isEdit: boolean;
  editPostId: string;
  isLoading: boolean = false;
  imagePreview: string; 

  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl('', {
        validators: [Validators.required]
      }),
      imageUrl: new FormControl('')
    });
    
    this.activatedRoute.params.subscribe(
      res => {
        if (res.id) {
          this.editPostId = res.id;
          this.isEdit = true;
          this.isLoading = true;
          this.postService.getPost(this.editPostId).subscribe(
            (res: {message: string, post: Post}) => {
              this.isLoading = false;
              const { post } = res;
              this.postForm.setValue({
                title: post.title,
                content: post.content
              });  
            },
            error => console.log(error)
          );
        } else {
          this.isEdit = false;
        }
      }
    );
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({
      imageUrl: file
    });
    this.postForm.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  onSavePost() {
    console.log(this.postForm.value);
    const { title, content } = this.postForm.value;
    if (this.postForm.invalid) {
      return;
    } else {
      if (!this.isEdit) {
        this.postService.createPost(title, content);
      } else {
        this.postService.editPost(this.editPostId, title, content);
      }
      this.postForm.reset();
    }

  }
}