import { Injectable } from '@angular/core';
import { VehicleType } from '../models/vehicleType/vehicle-type';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService extends CrudService<VehicleType> {
  protected readonly serviceUrl = `${environment.apiUrl}/vehicle`;
}
