import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { Currency } from '../models/currency';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService extends CrudService<Currency> {
  protected readonly serviceUrl = `${environment.apiUrl}/currency`;
}
