import { MalfunctionSubgroup } from './malfunctionSubgroup';
import { TEntity } from '../../core/models/entity/entity';

export class Malfunction extends TEntity<Malfunction> {
  public name?: string;
  public malfunctionSubgroup?: MalfunctionSubgroup;
}
