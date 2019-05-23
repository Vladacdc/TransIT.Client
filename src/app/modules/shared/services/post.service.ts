import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Post } from '../models/post';

@Injectable()
export class PostService extends CrudService<Post> {
  protected readonly serviceUrl = `${environment.apiUrl}/Post`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/Post`;

  protected mapEntity(entity: Post): Post {
    return new Post(entity);
  }
}
