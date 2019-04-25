import { MalfunctionGroup } from './malfunctionGroup';
import { TEntity } from '../../core/models/entity/entity';

export class MalfunctionSubgroup extends TEntity<MalfunctionSubgroup> {
  public name?: string;
  public malfunctionGroup?: MalfunctionGroup;
}
