import { TEntity } from '../../core/models/entity/entity';
import { Currency } from './currency';

// TODO: Add unit property.
export class PartIn extends TEntity<PartIn> {
  createdDate: Date;
  updatedDate: Date;
  arrivalDate: Date;
  amount: number;
  price: number;
  currency: Currency;
  batch: string;

  constructor(partIn: Partial<PartIn>) {
    super(partIn);
    this.currency = new Currency(partIn.currency);
  }
}
