import { TEntity } from '../../core/models/entity/entity';

export class Manufacturer extends TEntity<Manufacturer> {
  name: string;

   constructor(manufacturer: Partial<Manufacturer>) {
    super(manufacturer);
  }
}
