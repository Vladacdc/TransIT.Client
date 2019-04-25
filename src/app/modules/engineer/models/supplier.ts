import { User } from '../../admin/models/user/user';
import { TEntity } from '../../core/models/entity/entity';

export class Supplier extends TEntity<Supplier> {
  public name?: string;
  public createDate?: Date;
  public modDate?: Date;
  public create?: User;
  public mod?: User;
}
