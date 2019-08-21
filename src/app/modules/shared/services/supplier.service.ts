import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Supplier } from '../models/supplier';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends CrudService<Supplier> {
  protected readonly serviceUrl = `${environment.apiUrl}/supplier`; 
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/supplier`;

  getEntitiesSmart(filter: string = '', sorting: string = 'none', pageNumber = 0, pageSize = 3): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.serviceUrl, {
      params: new HttpParams()
          .set('filter', filter)
          .set('sorting', sorting)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
    }).pipe(
      //map(res =>  res["payload"])
    );
  }

  protected mapEntity(entity: Supplier): Supplier {
    return new Supplier(entity);
}
}
