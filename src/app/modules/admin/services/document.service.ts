import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Documents } from '../models/document/document';
import { getFromStorage, saveToStorage } from './serviceTools';

@Injectable({
  providedIn: 'root'
})

export class DocumentService extends CrudService<Documents> {
  protected readonly serviceUrl = `${environment.apiUrl}/document`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/document`;

  get selectedItem(): Documents {
    return this.mapEntity(getFromStorage('selectedDocument'));
  }
  set selectedItem(value: Documents) {
    saveToStorage('selectedDocument', value);
  }

  protected mapEntity(entity: Documents): Documents {
    return new Documents(entity);
  }
}
