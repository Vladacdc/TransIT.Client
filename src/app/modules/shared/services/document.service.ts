import { Injectable } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../../environments/environment';
import { Document } from '../models/document';
import { getFromStorage, saveToStorage } from './serviceTools';
import { map, tap, catchError } from 'rxjs/operators';
import { saveAs } from 'file-saver';

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

  addDocument(document: Document) {
    console.log(document);
    this.spinner.show();
    const formData = new FormData();
    for (const prop in document) {
      if (!document.hasOwnProperty(prop)) {
        continue;
      }
      formData.append(prop, document[prop]);
    }
    return this.http.post<Document>(this.serviceUrl, formData).pipe(
      map(addedEntity => this.mapEntity(addedEntity)),
      tap(data => this.handleSuccess('added document', data)),
      catchError(this.handleError())
    );
  }
  downloadFile1(document: Document) {
    this.spinner.show();
    return this.http.get(`${this.serviceUrl}/${document.id}/file`).pipe(catchError(this.handleError()));
  }
  public downloadFile(document: Document) {
    this.http.get(`${this.serviceUrl}/${document.id}/file`, { responseType: 'blob' }).subscribe(blob => {
      saveAs(blob, document.path.replace(/^.*[\\\/]/, ''));
    });
  }
  protected mapEntity(entity: Document): Document {
    return new Document(entity);
  }
}
