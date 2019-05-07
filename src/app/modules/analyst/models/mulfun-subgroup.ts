import { TEntity } from '../../core/models/entity/entity';
import { MalfuncGroup } from './mulfun-group';

export class MalfunSubgroup extends TEntity<MalfunSubgroup> {
  name: string;
  malfunctionGroup: MalfuncGroup;
}
