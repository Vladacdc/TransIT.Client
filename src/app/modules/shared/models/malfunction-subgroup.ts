import { TEntity } from '../../core/models/entity/entity';
import { MalfunctionGroup } from './malfunction-group';

export class MalfunctionSubgroup extends TEntity<MalfunctionSubgroup> {
  name: string;
  malfunctionGroup: MalfunctionGroup;

  constructor(subgroup: Partial<MalfunctionSubgroup>) {
    super(subgroup);
    this.malfunctionGroup = new MalfunctionGroup(this.malfunctionGroup);
  }
}
