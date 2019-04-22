import { Injectable } from '@angular/core';
import {CrudService} from '../../core/services/crud.service';
import {environment} from '../../../../environments/environment';
import {Document} from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends CrudService<Document> {
  protected readonly serviceUrl = `${environment.apiUrl}/document`;
}
