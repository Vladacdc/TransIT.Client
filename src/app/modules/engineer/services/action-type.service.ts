import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { ActionType } from '../models/actionType';

@Injectable()
export class ActionTypeService extends CrudService<ActionType> {
  protected readonly serviceUrl = `${environment.apiUrl}/actiontype`;

  protected mapEntity(entity: ActionType): ActionType {
    return new ActionType(entity);
  }
}
