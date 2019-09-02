import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Manufacturer } from '../models/manufacturer';

@Injectable()
export class ManufacturerService extends CrudService<Manufacturer> {
  protected readonly serviceUrl = `${environment.apiUrl}/manufacturer`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/manufacturer`;

  protected mapEntity(entity: Manufacturer): Manufacturer {
    return new Manufacturer(entity);
  }
}
