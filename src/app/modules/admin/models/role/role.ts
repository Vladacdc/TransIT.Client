import { TEntity } from 'src/app/modules/core/models/entity/entity';

export class Role extends TEntity<Role> {
  name: string;
  transName: string;
}
