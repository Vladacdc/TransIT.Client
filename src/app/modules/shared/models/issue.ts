import { State } from './state';
import { Vehicle } from './vehicle';
import { Malfunction } from './malfunction';
import { TEntity } from '../../core/models/entity/entity';
import { Employee } from './employee';

export class Issue extends TEntity<Issue> {
  state: State;
  malfunction: Malfunction;
  warranty: boolean;
  vehicle: Vehicle;
  assignedTo: Employee;
  deadline: Date;
  summary: string;
  createdDate: Date;
  updatedDate: Date;
  priority: number;
  number: number;
  date: Date;

  constructor(issue: Partial<Issue>) {
    super(issue);
    this.state = new State(this.state);
    this.malfunction = new Malfunction(this.malfunction);
    this.vehicle = new Vehicle(this.vehicle);
    this.assignedTo = new Employee(this.assignedTo);
  }

  get deletable(): boolean {
    return this.state.name.toLowerCase() === 'new';
  }
}
