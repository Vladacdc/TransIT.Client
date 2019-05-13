import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { User } from '../user/user';

export class Supplier extends TEntity<Supplier> {
    public name?: string;
    public createDate?: Date;
    public modDate?: Date;
    public create?: User;
    public mod?: User;
  }
