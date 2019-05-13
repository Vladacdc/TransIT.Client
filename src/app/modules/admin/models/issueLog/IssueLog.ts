import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { User } from '../user/user';
import { ActionType } from '../action/actiontype';
import { Issue } from '../issue/issue';
import { Supplier } from '../supplier/supplier';
import { State } from '../state/state';

export class IssueLog extends TEntity<IssueLog> {
    public description?: string;
    public expenses?: number;
    public actionType?: ActionType;
    public issue?: Issue;
    public newState?: State;
    public oldState?: State;
    public supplier?: Supplier;
    public create?: User;
    public mod?: User;
    public createDate?: Date;
    public modDate?: Date;
  }
