import { TEntity } from '../../core/models/entity/entity';
import { MalfunctionSubgroup } from './malfunction-subgroup';

export class Malfunction extends TEntity<Malfunction> {
  name: string;
  malfunctionSubgroup: MalfunctionSubgroup;

  constructor(malfunction: Partial<Malfunction>) {
    super(malfunction);
    this.malfunctionSubgroup = new MalfunctionSubgroup(this.malfunctionSubgroup);
  }
}
