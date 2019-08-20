import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { PartIn } from '../models/part-in';

@Injectable({
  providedIn: 'root'
})
export class PartsInService extends CrudService<PartIn> {
  protected readonly serviceUrl = `${environment.apiUrl}/partsin`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/partsin`;

  protected mapEntity(entity: PartIn): PartIn {
    return new PartIn(entity);
  }
}
