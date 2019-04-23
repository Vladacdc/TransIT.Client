import {State} from './state';
import {Vehicle} from './vehicle';
import {Malfunction} from './malfunction';
import {User} from './user';

export class Issue {
  constructor(
    public id?: number,
    public state?: State,
    public malfunction?: Malfunction,
    public warranty?: number,
    public vehicle?: Vehicle,
    public assignedTo?: User,
    public deadLine?: Date,
    public summary?: string,
    public createDate?: Date,
    public modDate?: Date
  ) {}
}
