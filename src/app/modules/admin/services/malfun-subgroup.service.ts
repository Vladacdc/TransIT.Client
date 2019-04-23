import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { MalfunSubgroup } from '../models/malfun-subgroup/malfun-subgroup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MalfunSubgroupService extends CrudService<MalfunSubgroup> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunctionSubGroup`;
}
