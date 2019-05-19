import { State } from './state';
import { Vehicle } from './vehicle';
import { Malfunction } from './malfunction';
import { User } from './user';
import { TEntity } from '../../core/models/entity/entity';
import { Employee } from './employee';

export class Issue extends TEntity<Issue> {
  state?: State;
  malfunction?: Malfunction;
  warranty?: number;
  vehicle?: Vehicle;
  assignedTo?: Employee;
  deadline?: Date;
  summary?: string;
  createDate?: Date;
  modDate?: Date;
  priority: number;
  number: number;
}
