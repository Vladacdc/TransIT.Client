import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { ActionType } from '../models/action-type';

@Injectable()
export class ActionTypeService extends CrudService<ActionType> {
  protected readonly serviceUrl = `${environment.apiUrl}/actiontype`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/actiontype`;

  protected mapEntity(entity: ActionType): ActionType {
    return new ActionType(entity);
  }
}
