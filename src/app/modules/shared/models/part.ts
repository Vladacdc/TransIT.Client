import { TEntity } from '../../core/models/entity/entity';
import { Unit } from './unit';
import { Manufacturer } from './manufacturer';

export class Part extends TEntity<Part> {
    name: string;
    code: string;
    manufacturer: Manufacturer;
    unit: Unit;
    manufacturerName?: string;
    unitName?: string;
}
