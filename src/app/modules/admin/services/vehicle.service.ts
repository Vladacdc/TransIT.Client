import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';
import { Vehicle } from '../models/vehicle/vehicle';

@Injectable()
export class VehicleService extends CrudService<Vehicle>{
  protected readonly serviceUrl = `${environment.apiUrl}/vehicle`;
}
