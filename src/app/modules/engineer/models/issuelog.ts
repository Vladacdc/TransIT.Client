import { Issue } from '../../shared/models/issue';
import { State } from './state';
import { ActionType } from './actionType';
import { Supplier } from './supplier';
import { User } from './user';
import { TEntity } from '../../core/models/entity/entity';

export class IssueLog extends TEntity<IssueLog> {
  description?: string;
  expenses?: number;
  actionType?: ActionType;
  issue?: Issue;
  newState?: State;
  oldState?: State;
  supplier?: Supplier;
  create?: User;
  mod?: User;
  createDate?: Date;
  modDate?: Date;
}
