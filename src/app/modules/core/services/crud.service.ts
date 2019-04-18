import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TEntity } from '../models/entity/entity';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from './spinner.service';

@Injectable()
export class CrudService<T extends TEntity> {
  protected readonly serviceUrl: string;

  constructor(protected http: HttpClient, protected spinner: SpinnerService) {}

  getEntities(): Observable<T[]> {
    this.spinner.show();
    return this.http.get<T[]>(this.serviceUrl).pipe(
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  getEntity(id: number): Observable<T> {
    this.spinner.show();
    return this.http.get<T>(`${this.serviceUrl}/${id}`).pipe(
      tap(data => this.handleSuccess('fetched data', data)),
      catchError(this.handleError())
    );
  }

  addEntity(entity: T): Observable<T> {
    this.spinner.show();
    return this.http.post<T>(this.serviceUrl, entity).pipe(
      tap(data => this.handleSuccess('added entity', data)),
      catchError(this.handleError())
    );
  }

  updateEntity(entity: T): Observable<T> {
    this.spinner.show();
    return this.http.put<T>(`${this.serviceUrl}/${entity.id}`, entity).pipe(
      tap(data => this.handleSuccess('updated entity', data)),
      catchError(this.handleError())
    );
  }

  deleteEntity(id: number): Observable<T> {
    this.spinner.show();
    return this.http.delete<T>(`${this.serviceUrl}/${id}`).pipe(
      tap(_ => this.handleSuccess('deleted entity', id)),
      catchError(this.handleError())
    );
  }

  protected handleSuccess(message: string, data: any) {
    console.log(message, data);
    this.spinner.hide();
  }

  protected handleError() {
    return (error: any): Observable<never> => {
      console.warn(error);
      this.spinner.hide();
      return throwError(error);
    };
  }
}
