import { Role } from './role';
import { TEntity } from '../../core/models/entity/entity';

export class User extends TEntity<User> {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  login?: string;
  password?: string;
  role?: Role;
}
