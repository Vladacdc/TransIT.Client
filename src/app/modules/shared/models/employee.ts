import { TEntity } from '../../core/models/entity/entity';
import { Post } from './position';

export class Employee extends TEntity<Employee> {
  firstName: string;
  middleName: string;
  lastName: string;
  shortName: string;
  post: Post;

  constructor(employee: Partial<Employee>) {
    super(employee);
    this.post = new Post(this.post);
  }
}
