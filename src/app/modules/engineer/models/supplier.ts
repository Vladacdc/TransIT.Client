import {User} from '../../admin/models/user/user';

export class Supplier {
  constructor(
    public id?: number,
    public name?: string,
    public createDate?: Date,
    public modDate?: Date,
    public create?: User,
    public mod?: User
  ) {}
}
