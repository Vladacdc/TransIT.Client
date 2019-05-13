import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { Malfunction } from '../malfunc/malfunc';
import { Vehicle } from '../vehicle/vehicle';
import { User } from '../user/user';
import { State } from '../state/state';

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
