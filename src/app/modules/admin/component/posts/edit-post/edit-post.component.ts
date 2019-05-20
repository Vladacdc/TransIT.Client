import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post/post';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { STRING_FIELD_ERRORS } from 'src/app/custom-errors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  private readonly stringFieldValidators: Validators[] = [
    Validators.required,
    Validators.minLength(0),
    Validators.maxLength(30),
    Validators.pattern(/^[A-Za-zА-Яа-яЄєІіЇїҐґ\-\']+$/)
  ];
  readonly customFieldErrors = STRING_FIELD_ERRORS;

  @Output() editPost = new EventEmitter<Post>();
  @Input()
  set post(post: Post) {
    this._post = post;
    this.setUpForm();
  }

  postForm: FormGroup;
  _post: Post;

  constructor(private fb: FormBuilder, private postService: PostService, private toast: ToastrService) {}

  ngOnInit() {
    this.setUpForm();
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }

    this.updatePost();
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
      name: [this._post && this._post.name, this.stringFieldValidators]
    });
  }

  private updatePost() {
    const post = new Post({ ...this._post, ...this.formValue });
    this.postService
      .updateEntity(post)
      .subscribe(
        updatedPost => this.editPost.next(updatedPost),
        _ => this.toast.error('Не вдалось оновити посаду', 'Помилка оновлення посади')
      );
  }

  private get formValue() {
    return this.postForm.value;
  }
}
