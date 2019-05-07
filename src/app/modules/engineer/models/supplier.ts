import { User } from '../../admin/models/user/user';
import { TEntity } from '../../core/models/entity/entity';

export class Supplier extends TEntity<Supplier> {
  name?: string;
  createDate?: Date;
  modDate?: Date;
  create?: User;
  mod?: User;
}
