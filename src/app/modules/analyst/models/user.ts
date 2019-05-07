import { TEntity } from '../../core/models/entity/entity';
import { Role } from './role';

export class User extends TEntity<User> {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: number;
  login: string;
  password?: string;
  role: Role;
  isActive: boolean;
}
