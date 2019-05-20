import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { Post } from '../post/post';

export class Employee extends TEntity<Employee> {
  firstName: string;
  middleName: string;
  lastName: string;
  shortName: string;
  boardNumber: number;
  post: Post;

  constructor(employee: Partial<Employee>) {
    super(employee);
    this.post = new Post(this.post);
  }
}
