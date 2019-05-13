import { State } from './state';
import { Vehicle } from './vehicle';
import { Malfunction } from './malfunction';
import { User } from './user';
import { TEntity } from '../../core/models/entity/entity';

export class Issue extends TEntity<Issue> {
  public state?: State;
  public malfunction?: Malfunction;
  public warranty?: number;
  public vehicle?: Vehicle;
  public assignedTo?: User;
  public deadline?: Date;
  public summary?: string;
  public createDate?: Date;
  public modDate?: Date;
}
