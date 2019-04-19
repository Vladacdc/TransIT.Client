import {User} from '../../admin/models/user/user';
import {Issue} from './issue';
import {State} from './state';
import {ActionType} from './actionType';
import {Supplier} from './supplier';

export class IssueLog {
  constructor(
    public id: number = null,
    public description: string = null,
    public expenses: number = null,
    public createDate: Date = null,
    public modDate: Date = null,
    public actionType: ActionType = null,
    public create: User = null,
    public issue: Issue = null,
    public mod: User = null,
    public newState: State = null,
    public oldState: State = null,
    public supplier: Supplier = null
  ) {}
}
