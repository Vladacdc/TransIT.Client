import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY, ObservableInput } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';
import { Injectable } from '@angular/core';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;

  constructor(private auth: AuthentificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthentificationToken(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401 || this.refreshTokenInProgress) {
          return throwError(error);
        }
        this.refreshTokenInProgress = true;
        return this.auth.refreshAccessToken().pipe(
          switchMap(_ => this.handleSuccess(request, next)),
          catchError(_ => this.handleError(error))
        );
      })
    );
  }

  private addAuthentificationToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.auth.getToken();
    if (token && token.accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
    }
    return request;
  }

  private handleSuccess(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Accessed token refreshed');
    this.refreshTokenInProgress = false;
    request = this.addAuthentificationToken(request);
    return next.handle(request);
  }

  private handleError(error: HttpErrorResponse): ObservableInput<never> {
    console.error('Error on refreshing token');
    this.refreshTokenInProgress = false;
    return throwError(error);
  }
}
