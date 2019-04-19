import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { ActionType } from '../models/action/actiontype';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ActionTypeService extends CrudService<ActionType> {
    protected readonly serviceUrl = `${environment.apiUrl}/action`;
  }
  
