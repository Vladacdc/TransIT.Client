import {Role} from './role';

export class User {
  constructor(
    public id: number,
    public firstName: string = null,
    public middleName: string = null,
    public lastName: string = null,
    public email: string = null,
    public phoneNumber: string = null,
    public login: string = null,
    public password: string = null,
    public role: Role = null
  ) {}
}
