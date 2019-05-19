import { Injectable } from '@angular/core';
import { State } from '../models/state/state';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { getFromStorage, saveToStorage } from './serviceTools';

@Injectable({
  providedIn: 'root'
})
export class StateService extends CrudService<State> {
  protected readonly serviceUrl = `${environment.apiUrl}/state`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/state`;

  get selectedItem(): State {
    return this.mapEntity(getFromStorage('selectedDocument'));
  }
  set selectedItem(value: State) {
    saveToStorage('selectedDocument', value);
  }

  protected mapEntity(entity: State): State {
    return new State(entity);
  }
}

