import { TEntity } from 'src/app/modules/core/models/entity/entity';

export class User extends TEntity {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  login: string;
  role: string;
}

