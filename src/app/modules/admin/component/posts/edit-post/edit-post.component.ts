import { Component, Output, EventEmitter, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NAME_FIELD_ERRORS } from 'src/app/custom-errors';
import { Post } from 'src/app/modules/shared/models/post';
import { PostService } from 'src/app/modules/shared/services/post.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit {
  selectedPost: Post;
  postForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Output() updatePost = new EventEmitter<Post>();
  @Input()
  set post(post: Post) {
    if (!post) {
      return;
    }
    this.selectedPost = new Post(post);
    if (this.postForm) {
      this.resetForm();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: PostService,
    private toast: ToastrService,
    private translate : TranslateService
  ) {}

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      id: [''],
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
    });
    this.postForm.patchValue(this.selectedPost);
  }

  updateData() {
    if (this.postForm.invalid) {
      return;
    }
    const form = this.postForm.value;
    const post: Post = {
      id: form.id as number,
      name: form.name as string,
    };
    
    this.service.updateEntity(post).subscribe(
      _ => {
        this.updatePost.next(post);
        this.toast.success('', this.translate.instant('Admin.Post.Edited'));
        },
        _ => this.toast.error(this.translate.instant("Admin.Post.NotEdited")), this.translate.instant("Admin.Post.EditError")
    );
    
    this.closeDiv.nativeElement.click();
  }

  resetForm() {
    this.postForm.patchValue(this.selectedPost);
  }
}
