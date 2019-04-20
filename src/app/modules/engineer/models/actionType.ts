import {User} from '../../admin/models/user/user';

export class ActionType {
  constructor(
    public id?: number,
    public name?: string,
    public createDate?: Date,
    public modDate?: Date,
    public create?: User,
    public mod?: User
  ) {}
}
