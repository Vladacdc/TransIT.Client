import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { PartIn } from '../models/part-in';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../../core/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class PartsInService extends CrudService<PartIn> {
  protected readonly serviceUrl = `${environment.apiUrl}/partsin`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/partsin`;

  /**
   *
   */
  constructor(http: HttpClient, spinner: SpinnerService) {
    super(http, spinner);
    PartsInService.prototype.getFilteredEntities = this.getFilteredEntities;
  }

  protected mapEntity(entity: PartIn): PartIn {
    return new PartIn(entity);
  }

  getFilteredEntities(params: any): Observable<any> {
    const values = [
      new PartIn({
         amount: 5,
         price: 15,
         createdDate: new Date(),
         updatedDate: new Date(),
         arrivalDate: new Date(),
         batch: '8021324352',
         currencyName: 'Австралійский долар',
         partName: 'Aртек Шоколадний',
         unitName: 'Шт.'
      }),
      new PartIn({
        amount: 5,
        price: 15,
        createdDate: new Date(),
        updatedDate: new Date(),
        arrivalDate: new Date(),
        batch: '8021324352',
        currencyName: 'Австралійский долар',
        partName: 'Aртек Горіховий',
        unitName: 'Шт.'
      }),
      new PartIn({
        amount: 5,
        price: 15,
        createdDate: new Date(),
        updatedDate: new Date(),
        arrivalDate: new Date(),
        batch: '8021324352',
        currencyName: 'Австралійский долар',
        partName: 'Aртек Класичний',
        unitName: 'Шт.'
      })
    ];
    return of(values);
  }
}
