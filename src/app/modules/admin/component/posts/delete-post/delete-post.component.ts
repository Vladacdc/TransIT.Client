import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/modules/shared/models/post';
import { PostService } from 'src/app/modules/shared/services/post.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent {
  @Input() post: Post;
  @Output() deletePost = new EventEmitter<Post>();

  constructor(private postService: PostService, private toast: ToastrService) {}

  delete(): void {
    this.postService
      .deleteEntity(this.post.id)
      .subscribe(
        () => this.deletePost.next(this.post),
        () => this.toast.error('Не вдалось видалити посаду', 'Помилка видалення')
      );
  }
}
