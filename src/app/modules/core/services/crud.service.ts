import { HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TEntity } from '../models/entity/entity';
import { tap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Injectable()
export class CrudService<T extends TEntity<T>> {
  protected readonly serviceUrl: string;
  protected readonly datatableUrl: string;

  constructor(protected http: HttpClient, protected spinner: SpinnerService) {}

  getFilteredEntities(params: any): Observable<any> {
    return this.http.post<any>(this.datatableUrl, params, {}).pipe(
      map(response => ({ ...response, data: response.data.map(d => this.mapEntity(d)) })),
      catchError(this.handleError())
    );
  }

  getEntities(): Observable<T[]> {
    this.spinner.show();
    return this.http.get<T[]>(this.serviceUrl).pipe(
      map(array => array.map(entity => this.mapEntity(entity))),
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  getEntity(id: number | string): Observable<T> {
    this.spinner.show();
    return this.http.get<T>(`${this.serviceUrl}/${id}`).pipe(
      map(entity => this.mapEntity(entity)),
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  addEntity(entity: T): Observable<T> {
    this.spinner.show();
    return this.http.post<T>(this.serviceUrl, entity).pipe(
      map(addedEntity => this.mapEntity(addedEntity)),
      tap(data => this.handleSuccess('added entity', data)),
      catchError(this.handleError())
    );
  }

  updateEntity(entity: T): Observable<T> {
    this.spinner.show();
    return this.http.put<T>(`${this.serviceUrl}/${entity.id}`, entity).pipe(
      map(updatedEntity => this.mapEntity(updatedEntity)),
      tap(data => this.handleSuccess('updated entity', data)),
      catchError(this.handleError())
    );
  }

  deleteEntity(id: number | string): Observable<T> {
    this.spinner.show();
    return this.http.delete<T>(`${this.serviceUrl}/${id}`).pipe(
      tap(_ => this.handleSuccess('deleted entity', id)),
      catchError(this.handleError())
    );
  }

  protected handleSuccess(message: string, data: any) {
    this.spinner.hide();
  }

  protected handleError() {
    return (error: any): Observable<never> => {
      this.spinner.hide();
      return throwError(error);
    };
  }

  protected mapEntity(entity: T): T {
    return entity;
  }
}
