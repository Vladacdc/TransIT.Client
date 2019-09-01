import { TEntity } from '../../core/models/entity/entity';
import { Currency } from './currency';

export class PartIn extends TEntity<PartIn> {
  createdDate: Date;
  updatedDate: Date;
  arrivalDate: string;
  amount: number;
  price: number;
  batch: string;

  currency: Currency;
  part: any;
  unit: any;

  partName: string;
  unitName: string;
  currencyName: string;

  constructor(partIn: Partial<PartIn>) {
    super(partIn);
    this.part = partIn.part;
    this.unit = partIn.unit;
    this.currency = new Currency(partIn.currency);
    this.currencyName = this.currency.fullName;
    this.partName = partIn.part.name;
    this.unitName = partIn.unit.shortName;
  }
}
