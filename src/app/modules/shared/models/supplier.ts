import { TEntity } from '../../core/models/entity/entity';
import { Country } from './country';
import { Currency } from './currency';
import { User } from './user';

export class Supplier extends TEntity<Supplier> {
  public name?: string;
  public fullName?: string;
  public edrpou?: string;
  public currency?: Currency;
  public currencyFullName?: string;
  public country?: Country;
  public countryName?: string;
  public createdDate?: Date;
  public updatedDate?: Date;
  public create?: User;
  public mod?: User;

  constructor(supplier: Partial<Supplier>) {
    super(supplier);
    this.currency = new Currency(supplier.currency);
    this.country = new Country(supplier.country);
    this.currencyFullName = supplier.currency.fullName;
    this.countryName = supplier.country.name;
  }
}
