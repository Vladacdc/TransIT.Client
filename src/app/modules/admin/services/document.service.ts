import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from 'src/environments/environment';
import { Documents } from '../models/document/document';

@Injectable({
  providedIn: 'root'
})

export class DocumentService extends CrudService<Documents> {
  protected readonly serviceUrl = `${environment.apiUrl}/document`;

  selectedDocument: Documents = null;

  protected mapEntity(entity: Documents): Documents {
    return new Documents(entity);
  }
}
