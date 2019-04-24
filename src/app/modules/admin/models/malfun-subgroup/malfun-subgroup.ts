import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { MalfuncGroup } from '../malfuncGroup/malfunc-group';

export class MalfunSubgroup extends TEntity<MalfunSubgroup> {
  name: string;
  malfunctionGroup: MalfuncGroup;
}
