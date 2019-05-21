import { TEntity } from '../../core/models/entity/entity';

export class Currency extends TEntity<Currency> {
  id: number;
  shortName: string;
  fullName: string;

  constructor(currency: Partial<Currency>) {
    super(currency);
  }
}
