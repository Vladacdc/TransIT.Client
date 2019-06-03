import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends CrudService<Location>{
  protected readonly serviceUrl = `${environment.apiUrl}/location`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/location`;

  protected mapEntity(entity: Location): Location {
    return new Location(entity);
  }
}
