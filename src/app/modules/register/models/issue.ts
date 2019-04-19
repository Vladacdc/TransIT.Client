import { State } from './state';
import { Malfunction } from './malfunction';
import { Vehicle } from './vehicle';
import { TEntity } from '../../core/models/entity/entity';

export class Issue extends TEntity {
  state?: State;
  malfunction: Malfunction;
  vehicle: Vehicle;
  summary: string;
}
