import { Injectable } from '@angular/core';
import { State } from '../models/state';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class StateService extends CrudService<State> {
  protected readonly serviceUrl = `${environment.apiUrl}/state`;
}
