import { TEntity } from '../../core/models/entity/entity';
import { Currency } from './currency';
import { Part } from './part';
import { Unit } from './unit';

export class PartIn extends TEntity<PartIn> {
  createdDate: Date;
  updatedDate: Date;
  arrivalDate: string;
  amount: number;
  price: number;
  batch: string;

  currency: Currency;
  part: Part;
  unit: Unit;

  partName: string;
  unitName: string;
  currencyName: string;

  constructor(partIn: Partial<PartIn>) {
    super(partIn);
    this.part = partIn.part;
    this.unit = partIn.unit;
    this.currency = new Currency(partIn.currency);
    if (this.currency) {
      this.currencyName = this.currency.fullName;
    }
    if (this.part) {
      this.partName = partIn.part.name;
    }
    if (this.unit) {
      this.unitName = partIn.unit.name;
    }
  }
}
