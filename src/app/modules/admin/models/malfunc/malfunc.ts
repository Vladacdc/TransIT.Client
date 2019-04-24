import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { MalfunSubgroup } from '../malfun-subgroup/malfun-subgroup';

export class Malfunction extends TEntity<Malfunction> {
  name: string;
  malfunctionSubgroup: MalfunSubgroup;
}
