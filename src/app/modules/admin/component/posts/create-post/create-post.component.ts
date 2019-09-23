import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/modules/shared/models/post';
import { PostService } from 'src/app/modules/shared/services/post.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createPost = new EventEmitter<Post>();

  constructor(
    private service: PostService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private translate : TranslateService
  ) {}

  ngOnInit() {
    $('#createPost').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.postForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(0), Validators.maxLength(30)])),
    });
  }


  clickSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    const form = this.postForm.value;
    const post: Post = {
      id: 0,
      name: form.name as string,
    };

    this.service.addEntity(post).subscribe(
      newGroup => {
        this.createPost.next(newGroup);
        this.toast.success('', this.translate.instant('Admin.Post.Created'));
      },
      _ => this.toast.error(this.translate.instant("Admin.Post.NotCreated")), this.translate.instant("Admin.Post.CreateError")
    )
}
}
