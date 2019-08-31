import { TEntity } from '../../core/models/entity/entity';

export class Unit extends TEntity<Unit> {
  name: string;
  shortname: string;

  constructor(unit: Partial<Unit>) {
    super(unit);
  }
}
