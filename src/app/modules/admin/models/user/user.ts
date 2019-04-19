import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { Role } from '../role/role';

export class User extends TEntity {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phoneNumber: number;
  login: string;
  password?: string;
  role: Role;
}
