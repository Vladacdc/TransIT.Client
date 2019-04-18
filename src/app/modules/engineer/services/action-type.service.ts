import { Injectable } from '@angular/core';
import {CrudService} from '../../core/services/crud.service';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SpinnerService} from '../../core/services/spinner.service';
import {ActionType} from '../../core/models/actionType';

@Injectable()
export class ActionTypeService extends CrudService<ActionType> {
  protected readonly serviceUrl = `${environment.apiUrl}/actiontype`;

  constructor(
    http: HttpClient,
    spinner: SpinnerService
  ) {
    super(http, spinner);
  }
}
