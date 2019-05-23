import { TEntity } from '../../core/models/entity/entity';

export class Country extends TEntity<Country> {
  id: number;
  name: string;

  constructor(country: Partial<Country>) {
    super(country);
  }
}
