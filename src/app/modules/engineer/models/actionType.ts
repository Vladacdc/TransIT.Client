import {User} from '../../admin/models/user/user';

export class ActionType {
  constructor(
    public id: number = null,
    public name: string = null,
    public createDate: Date = null,
    public modDate: Date = null,
    public create: User = null,
    public mod: User = null
  ) {}
}
