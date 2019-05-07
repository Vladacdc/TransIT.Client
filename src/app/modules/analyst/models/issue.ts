import { TEntity } from '../../core/models/entity/entity';
import { User } from './user';
import { Vehicle } from './vehicle';
import { State } from './state';
import { Malfunction } from './mulfunction';

export class Issue extends TEntity<Issue> {
  state?: State;
  malfunction?: Malfunction;
  warranty?: number;
  vehicle?: Vehicle;
  assignedTo?: User;
  deadline?: Date;
  summary?: string;
  createDate?: Date;
  modDate?: Date;
}
