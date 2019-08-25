import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Part } from '../models/part';

@Injectable()
export class PartService extends CrudService<Part> {
  protected readonly serviceUrl = `${environment.apiUrl}/Part`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/Part`;

  protected mapEntity(entity: Part): Part {
    return new Part(entity);
  }
}
