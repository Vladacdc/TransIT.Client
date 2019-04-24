import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { ActionType } from '../models/action/actiontype';

@Injectable({
  providedIn: 'root'
})
export class ActionTypeService extends CrudService<ActionType> {
  protected readonly serviceUrl = `${environment.apiUrl}/actiontype`;
}
