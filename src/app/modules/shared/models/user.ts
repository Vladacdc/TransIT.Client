import { Role } from './role';
import { TEntity } from '../../core/models/entity/entity';

export class User extends TEntity<User> {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  login: string;
  password: string;
  role: Role;
  isActive: boolean;

  constructor(user: Partial<User>) {
    super(user);
    this.role = new Role(this.role);
  }
}
