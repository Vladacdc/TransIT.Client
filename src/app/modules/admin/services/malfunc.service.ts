import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { Malfunc } from '../models/malfunc/malfunc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MalfuncService extends CrudService<Malfunc> {
  protected readonly serviceUrl = `${environment.apiUrl}/malfunction`;
}
