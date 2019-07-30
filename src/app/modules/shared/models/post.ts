import { TEntity } from '../../core/models/entity/entity';

export class Post extends TEntity<Post> {
  name: string;
  createDate: Date;
  updatedDate: Date;

  constructor(post: Partial<Post>) {
    super(post);
  }
}
