import { State } from './state';
import { Malfunction } from './malfunction';
import { Vehicle } from './vehicle';
import { TEntity } from '../../core/models/entity/entity';

export enum Priority {
  'low',
  'medium',
  'high'
}

export class Issue extends TEntity<Issue> {
  state: State;
  malfunction: Malfunction;
  vehicle: Vehicle;
  summary: string;
  priority: Priority;
  number: number;

  constructor(issue: Partial<Issue>) {
    super(issue);
    this.state = new State(this.state);
    this.malfunction = new Malfunction(this.malfunction);
    this.vehicle = new Vehicle(this.vehicle);
  }

  get deletable(): boolean {
    return this.state.name.toLowerCase() === 'new';
  }
}
