import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends CrudService<Vehicle> {
  protected readonly serviceUrl = `${environment.apiUrl}/vehicle`;

  protected mapEntity(vehicle: Vehicle): Vehicle {
    return new Vehicle(vehicle);
  }
}
