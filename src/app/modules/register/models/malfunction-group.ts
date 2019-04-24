import { TEntity } from '../../core/models/entity/entity';
import { MalfuncGroup } from '../../admin/models/malfuncGroup/malfunc-group';

export class MalfunctionGroup extends TEntity<MalfuncGroup> {
  name: string;
}
