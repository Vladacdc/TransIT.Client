import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Unit } from '../models/unit';

@Injectable()
export class UnitService extends CrudService<Unit> {
  protected readonly serviceUrl = `${environment.apiUrl}/Unit`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/Unit`;

  protected mapEntity(entity: Unit): Unit {
    return new Unit(entity);
  }
}
