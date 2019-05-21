import { TEntity } from '../../core/models/entity/entity';

export class Supplier extends TEntity<Supplier> {
  name: string;

  constructor(supplier: Partial<Supplier>) {
    super(supplier);
  }
}
