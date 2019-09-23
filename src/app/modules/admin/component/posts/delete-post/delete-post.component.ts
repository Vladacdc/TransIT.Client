import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/modules/shared/models/post';
import { PostService } from 'src/app/modules/shared/services/post.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() post: Post;
  @Output() deletePost = new EventEmitter<Post>();

  constructor(private service: PostService, 
    private toast: ToastrService,
    private translate : TranslateService) {}

  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.service.deleteEntity(this.post.id).subscribe(
      data => {
        this.deletePost.next(this.post);
        this.toast.success('', this.translate.instant('Admin.Post.Deleted'));
      },
      _ => this.toast.error(this.translate.instant("Admin.Post.NotDeleted")), this.translate.instant("Admin.Post.DeleteError")
    );
  }
}
