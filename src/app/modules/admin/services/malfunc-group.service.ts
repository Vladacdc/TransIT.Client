import { Injectable } from '@angular/core';
import { MalfuncGroup } from '../models/malfuncGroup/malfunc-group';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MalfuncGroupService extends CrudService<MalfuncGroup> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunctionGroup`;
}

