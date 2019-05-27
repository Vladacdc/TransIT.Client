import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { Post } from 'src/app/modules/shared/models/post';
import { PostService } from 'src/app/modules/shared/services/post.service';
import { UniqueFieldValidator } from 'src/app/modules/shared/validators/unique-field-validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  private readonly stringFieldValidators: Validators[] = [
    Validators.required,
    Validators.minLength(0),
    Validators.maxLength(30),
    Validators.pattern(/^[A-Za-zА-Яа-яЄєІіЇїҐґ\-\']+( [A-Za-zА-Яа-яЄєІіЇїҐґ\-\']+)*$$/)
  ];
  readonly customFieldErrors = NAME_FIELD_ERRORS;

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
    this.hideModalWindow();
    this.setUpForm();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.hideModalWindow();
    this.setUpForm();
  }

  private setUpForm() {
    this.postForm = this.fb.group({
      name: [undefined, this.stringFieldValidators, UniqueFieldValidator.createValidator(this.postService, 'name')]
    });
  }

  private createPost() {
    const post = new Post(this.formValue);
    this.postService.addEntity(post).subscribe(
      newPost => {
        this.addPost.next(newPost);
        this.toast.success('', 'Посаду створено');
      },
      _ => this.toast.error('Не вдалось створити посаду', 'Помилка створення посади')
    );
  }

  private hideModalWindow() {
    const modalWindow: any = $('#createPost');
    modalWindow.modal('hide');
  }

  private get formValue() {
    return this.postForm.value;
  }
}
