import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TEntity } from '../models/entity/entity';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class CrudService<T extends TEntity> {
  protected readonly serviceUrl: string;

  constructor(protected http: HttpClient) {}

  getEntities(): Observable<T[]> {
    return this.http.get<T[]>(this.serviceUrl).pipe(
      tap(data => console.log('fetched data', data)),
      catchError(this.handleError())
    );
  }

  getEntity(id: number): Observable<T> {
    return this.http.get<T>(`${this.serviceUrl}/${id}`).pipe(
      tap(data => console.log('fetched data', data)),
      catchError(this.handleError())
    );
  }

  addEntity(entity: T): Observable<T> {
    return this.http.post<T>(this.serviceUrl, entity).pipe(
      tap(data => console.log('added entity', data)),
      catchError(this.handleError())
    );
  }

  updateEntity(entity: T): Observable<T> {
    return this.http.put<T>(`${this.serviceUrl}/${entity.id}`, entity).pipe(
      tap(data => console.log('updated entity', data)),
      catchError(this.handleError())
    );
  }

  deleteEntity(id: number): Observable<T> {
    return this.http.delete<T>(`${this.serviceUrl}/${id}`).pipe(
      tap(_ => console.log('deleted entity', id)),
      catchError(this.handleError())
    );
  }

  protected handleError() {
    return (error: any): Observable<never> => {
      console.warn(error);
      return throwError(error);
    };
  }
}
