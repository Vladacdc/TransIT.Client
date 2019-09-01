import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Manufacturer } from '../models/manufacturer';

@Injectable()
export class ManufacturerService extends CrudService<Manufacturer> {
  protected readonly serviceUrl = `${environment.apiUrl}/Manufacturer`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/Manufacturer`;

   protected mapEntity(entity: Manufacturer): Manufacturer {
    return new Manufacturer(entity);
  }
}
