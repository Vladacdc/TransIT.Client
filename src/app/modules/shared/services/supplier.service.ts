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
    return new Supplier(entity);
}
}
