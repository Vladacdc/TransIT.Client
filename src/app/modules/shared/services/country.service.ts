import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { Country } from '../models/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends CrudService<Country> {
  protected readonly serviceUrl = `${environment.apiUrl}/country`;
}
