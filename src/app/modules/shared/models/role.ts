import { TEntity } from '../../core/models/entity/entity';

export class Role extends TEntity<Role> {
  public name?: string;
  public transName?: string;
}
