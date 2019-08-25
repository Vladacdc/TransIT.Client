import { TEntity } from '../../core/models/entity/entity';
import { Unit } from './unit';
import { Manufacturer } from './manufacturer';

export class Part extends TEntity<Part> {
  name: string;
  code: string;
  manufacturer: Manufacturer;
  unit: Unit;

  constructor(part: Partial<Part>) {
    super(part);
    this.manufacturer = new Manufacturer(this.manufacturer);
    this.unit = new Unit(this.unit);
  }
}
