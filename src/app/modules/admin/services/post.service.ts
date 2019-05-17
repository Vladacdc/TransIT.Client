import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post/post';

@Injectable()
export class PostService extends CrudService<Post> {
  protected readonly serviceUrl = `${environment.apiUrl}/post`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/post`;

  protected mapEntity(post: Post): Post {
    return new Post(post);
  }
}
