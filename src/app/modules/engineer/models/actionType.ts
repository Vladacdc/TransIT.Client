import { User } from '../../admin/models/user/user';
import { TEntity } from '../../core/models/entity/entity';

export class ActionType extends TEntity<ActionType> {
  public name?: string;
  public createDate?: Date;
  public modDate?: Date;
  public create?: User;
  public mod?: User;
}
