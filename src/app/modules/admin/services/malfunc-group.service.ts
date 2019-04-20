import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../../core/services/crud.service';
import { MalfuncGroup } from '../models/malfuncGroup/malfunc-group';

@Injectable({
  providedIn: 'root'
})
export class MalfuncGroupService  extends CrudService<MalfuncGroup>{
  protected readonly serviceUrl = `${environment.apiUrl}/malfunctiongroup`;
}
