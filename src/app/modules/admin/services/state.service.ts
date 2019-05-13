import { Injectable } from '@angular/core';
import { State } from '../models/state/state';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService extends CrudService<State> {
  protected readonly serviceUrl = `${environment.apiUrl}/state`;
}

