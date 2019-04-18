import { Injectable } from '@angular/core';
import {CrudService} from '../../core/services/crud.service';
import {Issue} from '../../core/models/issue';
import {HttpClient} from '@angular/common/http';
import {SpinnerService} from '../../core/services/spinner.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class IssueService extends CrudService<Issue> {
  protected readonly serviceUrl = `${environment.apiUrl}/issue`;

  constructor(
    http: HttpClient,
    spinner: SpinnerService
  ) {
    super(http, spinner);
  }
}
