import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { VehicleType } from '../models/vehicleType';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService extends CrudService<VehicleType> {
  protected readonly serviceUrl = `${environment.apiUrl}/vehicleType`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/vehicleType`;

  protected mapEntity(entity: VehicleType): VehicleType {
    return new VehicleType(entity);
  }
}
