import { State } from './state';
import { Malfunction } from './malfunction';
import { Vehicle } from './vehicle';
import { TEntity } from '../../core/models/entity/entity';

export class Issue extends TEntity<Issue> {
  state: State;
  malfunction: Malfunction;
  vehicle: Vehicle;
  summary: string;

  constructor(issue: Partial<Issue>) {
    super(issue);
    this.state = new State(this.state);
    this.malfunction = new Malfunction(this.malfunction);
    this.vehicle = new Vehicle(this.vehicle);
  }
}
