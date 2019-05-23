import { TEntity } from '../../core/models/entity/entity';

export class MalfunctionGroup extends TEntity<MalfunctionGroup> {
  name: string;

  constructor(group: Partial<MalfunctionGroup>) {
    super(group);
  }
}
