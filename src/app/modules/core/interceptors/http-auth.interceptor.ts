import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, ObservableInput, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap, switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Token } from '../models/token/token';
import { TokenStore } from '../helpers/token-store';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private refreshInProgress = false;
  private refreshTokenSource = new Subject<Token>();
  private refreshToken$ = this.refreshTokenSource.asObservable();

  constructor(private auth: AuthenticationService, private tokenStore: TokenStore, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addAuthentificationToken(request);
    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => this.handleUnauthorized(request, next, error)));
  }

  private addAuthentificationToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.tokenStore.getToken();
    if (token && token.accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
    }
    return request;
  }

  private handleUnauthorized(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    if (error.status === 401) {
      return this.refreshToken().pipe(
        switchMap(() => {
          request = this.addAuthentificationToken(request);
          return next.handle(request);
        }),
        catchError(() => this.handleError(error))
      );
    }

    return throwError(error);
  }

  private refreshToken(): Observable<Token> {
    if (this.refreshInProgress) {
      return this.refreshToken$.pipe(first());
    } else {
      this.refreshInProgress = true;
      return this.auth.refreshAccessToken().pipe(tap(token => this.handleSuccess(token)));
    }
  }

  private handleSuccess(token: Token): void {
    this.refreshInProgress = false;
    this.refreshTokenSource.next(token);
  }

  private handleError(error: HttpErrorResponse): ObservableInput<never> {
    this.refreshInProgress = false;
    this.router.navigate(['/login']);
    this.refreshTokenSource.error(error);
    return throwError(error);
  }
}
