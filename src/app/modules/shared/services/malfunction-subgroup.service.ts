import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { MalfunctionSubgroup } from '../models/malfunction-subgroup';

@Injectable({
  providedIn: 'root'
})
export class MalfunctionSubgroupService extends CrudService<MalfunctionSubgroup> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunctionSubgroup`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/malfunctionSubgroup`;

  protected mapEntity(entity: MalfunctionSubgroup): MalfunctionSubgroup {
    return new MalfunctionSubgroup(entity);
  }
}
