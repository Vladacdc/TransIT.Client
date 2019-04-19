import {User} from '../../admin/models/user/user';
import {State} from './state';
import {Vehicle} from './vehicle';
import {Malfunction} from './malfunction';

export class Issue {
  constructor(
    public id: number = null,
    public summary: string = null,
    public warranty: number = null,
    public deadLine: Date = null,
    public state: State = null,
    public assignedTo: User = null,
    public vehicle: Vehicle = null,
    public malfunction: Malfunction = null,
    public createDate: Date = null,
    public modDate: Date = null
  ) {}
}
