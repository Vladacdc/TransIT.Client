import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { MalfunctionGroup } from '../models/malfunction-group';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionGroupService extends CrudService<MalfunctionGroup> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunctionGroup`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/malfunctionGroup`;

  protected mapEntity(entity: MalfunctionGroup): MalfunctionGroup {
    return new MalfunctionGroup(entity);
  }
}
