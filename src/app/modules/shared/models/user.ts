import { Role } from './role';
import { TEntity } from '../../core/models/entity/entity';

export class User extends TEntity<User> {
  public firstName?: string;
  public middleName?: string;
  public lastName?: string;
  public email?: string;
  public phoneNumber?: string;
  public login?: string;
  public password?: string;
  public role?: Role;
}
