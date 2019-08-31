import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SpinnerService } from '../../core/services/spinner.service';
import { Statistics } from '../models/statistics';

@Injectable()
export class StatisticsService {
  protected readonly serviceUrl = `${environment.apiUrl}/statistics`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/statistics`;

  
  constructor(protected http: HttpClient, protected spinner: SpinnerService) {}

  countMalfunctionGroup(malfunction: string, vehicle: string): Observable<number> {
    this.spinner.show();
    return this.http.get<number>(
        `${this.serviceUrl}/countmalfunctiongroup/?malfunctiongroupName=${malfunction}&vehicleTypeName=${vehicle}`)
        .pipe( map(entity => this.mapEntity(entity)),
          tap(data => this.handleSuccess('fetched data', data)),
          catchError(this.handleError())
      );
    
  }

  countMalfunctionSubGroup(malfunction: string, vehicle: string): Observable<number> {
    this.spinner.show();
    return this.http.get<number>(
      `${this.serviceUrl}/countmalfunctionsubgroup/?malfunctionsubgroupName=${malfunction}&vehicleTypeName=${vehicle}`)
      .pipe( map(entity => this.mapEntity(entity)),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }
  
  countMalfunction(malfunction: string, vehicle: string): Observable<number> {
    this.spinner.show();
    return this.http.get<number>(
      `${this.serviceUrl}/countmalfunction/?malfunctionName=${malfunction}&vehicleTypeName=${vehicle}`)
      .pipe( map(entity => this.mapEntity(entity)),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetMalfunctionStatistics(malfunction: string, startDate: Date = null, endDate: Date = null): Observable<number[]> {
    this.spinner.show();

    let httpParams = new HttpParams().set("malfunctionName", malfunction);
    
    if(startDate) {
      httpParams = httpParams.set("startDate", startDate.toString());
    }
    if(endDate) {
      httpParams = httpParams.set("endDate", endDate.toString());
    }

    return this.http.get<number[]>(
      `${this.serviceUrl}/malfunctionstatistics`, { 
        params: httpParams
      }).pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetMalfunctionGroupStatistics(malfunctionGroup: string, startDate: Date, endDate: Date): Observable<number[]> {
    this.spinner.show();
    return this.http.get<number[]>(
      `${this.serviceUrl}/malfunctiongroupstatistics`, { 
        params: new HttpParams()
          .set("malfunctionGroupName", malfunctionGroup)
          .set("startDate", startDate.toDateString()) 
          .set("endDate", endDate.toDateString())
      }).pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetMalfunctionSubGroupStatistics(malfunctionSubGroup: string, startDate: Date, endDate: Date): Observable<number[]> {
    this.spinner.show();
    return this.http.get<number[]>(
      `${this.serviceUrl}/malfunctionsubgroupstatistics`, { 
        params: new HttpParams()
          .set("malfunctionSubGroupName", malfunctionSubGroup)
          .set("startDate", startDate.toDateString())
          .set("endDate", endDate.toDateString())
      }).pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetAllMalfunctionsStatistics(malfunctionSubgroupName: string, startDate: Date, endDate: Date): Observable<Statistics[]> {
    this.spinner.show();
    return this.http.get<Statistics[]>(
      `${this.serviceUrl}/allmalfunctionsstatistics`, { 
        params: new HttpParams()
          .set("malfunctionSubgroupName", malfunctionSubgroupName)
          .set("startDate", startDate.toDateString())
          .set("endDate", endDate.toDateString())
      }).pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetAllMalfunctionGroupsStatistics(startDate: Date, endDate: Date): Observable<Statistics[]> {
    this.spinner.show();
    return this.http.get<Statistics[]>(`${this.serviceUrl}/allmalfunctiongroupsstatistics`, { 
        params: new HttpParams()
          .set("startDate", startDate.toDateString())
          .set("endDate", endDate.toDateString())
      }).pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }
  
  GetAllMalfunctionSubgroupsStatistics(malfunctionGroupName: string, startDate: Date, endDate: Date): Observable<Statistics[]> {
    this.spinner.show();
    return this.http.get<Statistics[]>(`${this.serviceUrl}/allmalfunctionsubgroupsstatistics`, { 
        params: new HttpParams()
          .set("malfunctionGroupName", malfunctionGroupName)
          .set("startDate", startDate.toDateString())
          .set("endDate", endDate.toDateString())
      }).pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  protected mapEntity(entity: number): number {
    return entity;
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
}

export function CreateMatTableRowFromStatistics(statistics: Statistics, columns: string[]): {}
{
  let dict = {};
  let i = 0;
  dict[columns[i]] = statistics.fieldName;
  statistics.statistics.forEach(num => {
    i += 1;
    dict[columns[i]] = num;
  });

  return dict;
}

