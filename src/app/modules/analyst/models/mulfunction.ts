import { TEntity } from '../../core/models/entity/entity';
import { MalfunSubgroup } from './mulfun-subgroup';

export class Malfunction extends TEntity<Malfunction> {
  name: string;
  malfunctionSubgroup: MalfunSubgroup;
}
