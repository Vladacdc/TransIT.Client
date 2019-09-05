import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { PartIn } from '../models/part-in';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../../core/services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class PartsInService extends CrudService<PartIn> {
  protected readonly serviceUrl = `${environment.apiUrl}/partsin`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/partsin`;

  constructor(http: HttpClient, spinner: SpinnerService) {
    super(http, spinner);
  }

  protected mapEntity(entity: PartIn): PartIn {
    return new PartIn(entity);
  }
}
