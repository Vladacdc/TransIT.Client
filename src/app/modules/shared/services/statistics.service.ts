import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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

  GetMalfunctionStatistics(malfunction: string): Observable<string[]> {
    this.spinner.show();
    return this.http.get<string[]>(
      `${this.serviceUrl}/malfunctionstatistics/?malfunctionName=${malfunction}`)
      .pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetMalfunctionGroupStatistics(malfunctionGroup: string): Observable<string[]> {
    this.spinner.show();
    return this.http.get<string[]>(
      `${this.serviceUrl}/malfunctiongroupstatistics/?malfunctionGroupName=${malfunctionGroup}`)
      .pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetMalfunctionSubGroupStatistics(malfunctionSubGroup: string): Observable<string[]> {
    this.spinner.show();
    return this.http.get<string[]>(
      `${this.serviceUrl}/malfunctionsubgroupstatistics/?malfunctionSubGroupName=${malfunctionSubGroup}`)
      .pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetAllMalfunctionsStatistics(malfunctionSubgroupName: string): Observable<Statistics[]> {
    this.spinner.show();
    return this.http.get<Statistics[]>(
      `${this.serviceUrl}/allmalfunctionsstatistics/?malfunctionSubgroupName=${malfunctionSubgroupName}`)
      .pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetAllMalfunctionGroupsStatistics(): Observable<Statistics[]> {
    this.spinner.show();
    return this.http.get<Statistics[]>(
      `${this.serviceUrl}/allmalfunctiongroupsstatistics/`)
      .pipe( map(entity => entity),
        tap(data => this.handleSuccess('fetched data', data)),
        catchError(this.handleError())
      );
  }

  GetAllMalfunctionSubgroupStatistics(malfunctionGroupName: string): Observable<Statistics[]> {
    this.spinner.show();
    return this.http.get<Statistics[]>(
      `${this.serviceUrl}/allmalfunctionsubgroupsstatistics/?malfunctionGroupName=${malfunctionGroupName}`)
      .pipe( map(entity => entity),
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