import {State} from './state';
import {Vehicle} from './vehicle';
import {Malfunction} from './malfunction';
import {User} from './user';

export class Issue {
  constructor(
    public id: number = null,
    public state: State = null,
    public malfunction: Malfunction = null,
    public warranty: number = null,
    public vehicle: Vehicle = null,
    public assignedTo: User = null,
    public deadLine: Date = null,
    public summary: string = null,
    public createDate: Date = null,
    public modDate: Date = null
  ) {}
}
