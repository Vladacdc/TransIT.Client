import { State } from './state';
import { Vehicle } from './vehicle';
import { Malfunction } from './malfunction';
import { User } from './user';
import { TEntity } from '../../core/models/entity/entity';

export class Issue extends TEntity<Issue> {
  state?: State;
  malfunction?: Malfunction;
  warranty?: number;
  vehicle?: Vehicle;
  assignedTo?: User;
  deadLine?: Date;
  summary?: string;
  createDate?: Date;
  modDate?: Date;
}
