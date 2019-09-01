import { TEntity } from '../../core/models/entity/entity';

export class Unit extends TEntity<Unit> {
  name: string;
  shortName: string;

  constructor(unit: Partial<Unit>) {
    super(unit);
  }
}
