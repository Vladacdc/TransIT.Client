import { User } from '../../admin/models/user/user';
import { TEntity } from '../../core/models/entity/entity';

export class ActionType extends TEntity<ActionType> {
  name?: string;
  createDate?: Date;
  modDate?: Date;
  create?: User;
  mod?: User;
}
