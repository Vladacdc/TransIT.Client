import {Issue} from './issue';
import {State} from './state';
import {ActionType} from './actionType';
import {Supplier} from './supplier';
import {User} from './user';

export class IssueLog {
  constructor(
    public id?: number,
    public description?: string,
    public expenses?: number,
    public createDate?: Date,
    public modDate?: Date,
    public actionType?: ActionType,
    public create?: User,
    public issue?: Issue,
    public mod?: User,
    public newState?: State,
    public oldState?: State,
    public supplier?: Supplier
  ) {}
}
