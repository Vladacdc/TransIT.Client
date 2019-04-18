import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SpinnerService} from '../../core/services/spinner.service';
import {CrudService} from '../../core/services/crud.service';
import {IssueLog} from '../../core/models/issuelog';

@Injectable()
export class IssuelogService extends CrudService<IssueLog> {
  protected readonly serviceUrl = `${environment.apiUrl}/issue`;

  constructor(
    http: HttpClient,
    spinner: SpinnerService
  ) {
    super(http, spinner);
  }
}
