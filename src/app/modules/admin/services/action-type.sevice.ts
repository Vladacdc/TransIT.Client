import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { ActionType } from '../models/action/actiontype';
import { getFromStorage, saveToStorage } from './serviceTools';

@Injectable({
  providedIn: 'root'
})
export class ActionTypeService extends CrudService<ActionType> {
  protected readonly serviceUrl = `${environment.apiUrl}/actiontype`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/actiontype`;

  get selectedItem(): ActionType {
    return this.mapEntity(getFromStorage('selectedAction'));
  }
  set selectedItem(value: ActionType) {
    saveToStorage('selectedAction', value);
  }

  protected mapEntity(entity: ActionType): ActionType {
    return new ActionType(entity);
  }
}
