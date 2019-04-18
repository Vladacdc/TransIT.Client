import { Injectable } from '@angular/core';
import {State} from '../../core/models/state';
import {CrudService} from '../../core/services/crud.service';
import {HttpClient} from '@angular/common/http';
import {SpinnerService} from '../../core/services/spinner.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class StateService extends CrudService<State> {
  protected readonly serviceUrl = `${environment.apiUrl}/state`;

  constructor(
    http: HttpClient,
    spinner: SpinnerService
  ) {
    super(http, spinner);
  }
}
