import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends CrudService<Vehicle> {
  protected readonly serviceUrl = `${environment.apiUrl}/vehicle`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/vehicle`;

  protected mapEntity(entity: Vehicle): Vehicle {
    return new Vehicle(entity);
  }
}
