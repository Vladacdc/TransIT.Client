import {Role} from './role';

export class User {
  constructor(
    public id?: number,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public login?: string,
    public password?: string,
    public role?: Role
  ) {}
}
