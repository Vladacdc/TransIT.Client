import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Document } from '../models/document';
import { getFromStorage, saveToStorage } from './serviceTools';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends CrudService<Document> {
  protected readonly serviceUrl = `${environment.apiUrl}/document`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/document`;

  get selectedItem(): Document {
    return this.mapEntity(getFromStorage('selectedDocument'));
  }
  set selectedItem(value: Document) {
    saveToStorage('selectedDocument', value);
  }

  protected mapEntity(entity: Document): Document {
    return new Document(entity);
  }
}
