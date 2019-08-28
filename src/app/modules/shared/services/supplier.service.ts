import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends CrudService<Supplier> {
  protected readonly serviceUrl = `${environment.apiUrl}/supplier`; 
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/supplier`;

  

  protected mapEntity(entity: Supplier): Supplier {
    let supplier = new Supplier(entity);
    if(entity.country) {
      supplier.countryName = entity.country.name;
    }
    if(entity.currency) {
      supplier.currencyFullName = entity.currency.fullName;
    }
    
    return supplier;
  }
}
