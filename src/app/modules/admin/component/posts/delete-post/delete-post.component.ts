import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/modules/shared/models/post';
import { PostService } from 'src/app/modules/shared/services/post.service';
@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() post: Post;
  @Output() deletePost = new EventEmitter<Post>();

  constructor(private service: PostService, private toast: ToastrService) {}

  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.service.deleteEntity(this.post.id).subscribe(
      data => {
        this.toast.success('', 'Посаду видалено');
        this.deletePost.next(this.post);
      },
      error => this.toast.error('Не вдалось видалити посаду', 'Помилка видалення')
    );
  }
}
