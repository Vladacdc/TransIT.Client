import { TEntity } from '../../core/models/entity/entity';

export class Post extends TEntity<Post> {
  name: string;

  constructor(post: Partial<Post>) {
    super(post);
  }
}
