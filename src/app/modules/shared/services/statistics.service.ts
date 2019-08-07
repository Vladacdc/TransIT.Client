import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../../core/services/spinner.service';

@Injectable()
export class StatisticsService {
  protected readonly serviceUrl = `${environment.apiUrl}/statistics`;
  protected readonly datatableUrl = `${environment.apiUrl}/datatable/statistics`;

  
  constructor(protected http: HttpClient, protected spinner: SpinnerService) {}

  countMalfunctionGroup(malfunction: string, vehicle: string): Observable<number> {
    this.spinner.show();
    return this.http.get<number>(
        `${this.serviceUrl}/countmalfunctiongroup/?malfunctionName=${malfunction}&vehicleTypeName=${vehicle}`
        );
  }

  countMalfunctionSubGroup(malfunction: string, vehicle: string): Observable<number> {
    this.spinner.show();
    return this.http.get<number>(`${this.serviceUrl}/countmalfunctionsubgroup/?malfunctionName=${malfunction}&vehicleTypeName=${vehicle}`);
  }
  
  countMalfunction(malfunction: string, vehicle: string): Observable<number> {
    this.spinner.show();
    return this.http.get<number>(`${this.serviceUrl}/countmalfunction/?malfunctionName=${malfunction}&vehicleTypeName=${vehicle}`);
  }
}