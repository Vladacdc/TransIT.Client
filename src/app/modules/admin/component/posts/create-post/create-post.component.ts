import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Post } from '../../../models/post/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  @Output() addPost = new EventEmitter<Post>();
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private toast: ToastrService) {}

  ngOnInit() {
    this.setUpForm();
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    this.createPost();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.setUpForm();
  }

  private setUpForm() {
    this.postForm = this.fb.group({
      name: [undefined, Validators.required]
    });
  }

  private createPost() {
    const post = new Post(this.formValue);
    this.postService
      .addEntity(post)
      .subscribe(
        newPost => this.addPost.next(newPost),
        _ => this.toast.error('Не вдалось створити посаду', 'Помилка створення посади')
      );
  }

  private get formValue() {
    return this.postForm.value;
  }
}
