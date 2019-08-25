import { TEntity } from '../../core/models/entity/entity';
import { Currency } from './currency';

export class PartIn extends TEntity<PartIn> {
  createdDate: Date;
  updatedDate: Date;
  arrivalDate: Date;
  amount: number;
  price: number;
  batch: string;

  currency: Currency;

  partName: string;
  unitName: string;
  currencyName: string;

  constructor(partIn: Partial<PartIn>) {
    super(partIn);
    this.currency = new Currency(partIn.currency);
    this.currencyName = this.currency.fullName;
    this.partName = 'TODO: назва запчастини';
    this.unitName = 'TODO: одиниці вимірювання';
  }
}
