import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY, ObservableInput, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap, switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Token } from '../models/token/token';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;

  private refreshTokenSource = new Subject<Token>();
  private refreshToken$ = this.refreshTokenSource.asObservable();

  constructor(private auth: AuthenticationService, private router: Router) {}

  refreshToken(): Observable<Token> {
    if (this.refreshTokenInProgress) {
      return this.refreshToken$.pipe(first());
    } else {
      this.refreshTokenInProgress = true;
      return this.auth.refreshAccessToken().pipe(
        tap(token => {
          this.handleSuccess();
          this.refreshTokenInProgress = false;
          this.refreshTokenSource.next(token);
        })
      );
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthentificationToken(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.refreshToken().pipe(
            switchMap(_ => {
              request = this.addAuthentificationToken(request);
              return next.handle(request);
            }),
            catchError(_ => this.handleError(error))
          );
        }

        return throwError(error);
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

  private handleSuccess(): void {
    console.log('Accessed token refreshed');
  }

  private handleError(error: HttpErrorResponse): ObservableInput<never> {
    console.error('Error on refreshing token');
    this.refreshTokenInProgress = false;
    this.router.navigate(['/login']);
    return throwError(error);
  }
}
