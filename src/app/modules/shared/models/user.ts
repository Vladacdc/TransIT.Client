import { Role } from './role';
import { TEntity } from '../../core/models/entity/entity';
import { Employee } from './employee';

export class User extends TEntity<User> {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userName: string;
  password: string;
  role: Role;
  isActive: boolean;
  employee: Employee;
  roleTransName: string;
  status: string;
  isEmployeeString: string;

  constructor(user: Partial<User>) {
    super(user);
    this.role = new Role(this.role);
  }
}
