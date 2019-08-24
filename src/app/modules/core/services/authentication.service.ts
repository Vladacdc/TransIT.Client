import { Injectable } from '@angular/core';
import { Token } from '../models/token/token';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { TokenStore } from '../helpers/token-store';
import { Role } from '../models/role/role';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private toast: ToastrService,
    private tokenStore: TokenStore,
    private spinner: SpinnerService,
    private translate: TranslateService
  ) {}

  login(login: string, password: string): Observable<Token> {
    this.spinner.show();
    return this.http
      .post<Token>(`${environment.apiUrl}/authentication/signin`, {
        login,
        password
      })
      .pipe(
        tap(token => this.handleSuccess(token)),
        catchError(error => this.handleError(error)),
        finalize(() => this.spinner.hide())
      );
  }

  private handleSuccess(token: Token): void {
    this.tokenStore.setToken(token);
    this.router.navigate([`/${this.tokenStore.getRole().toLowerCase()}`]);
  }

  private handleError(httpResponse: HttpErrorResponse): Observable<any> {
    if (httpResponse.status !== 0) {
      this.toast.error(
        this.translate.instant('Core.Error.SignInError.Text'),
        this.translate.instant('Core.Error.SignInError.Title')
      );
    }
    return throwError(httpResponse);
  }

  logout(): void {
    this.tokenStore.removeToken();
    this.router.navigate(['login']);
  }

  refreshAccessToken(): Observable<Token> {
    const currentToken = this.tokenStore.getToken();
    if (!currentToken) {
      return throwError('No token');
    }

    const { refreshToken, accessToken } = currentToken;
    return this.http
      .post<Token>(`${environment.apiUrl}/authentication/refreshToken`, {
        accessToken,
        refreshToken
      })
      .pipe(
        tap(newToken => this.handleRefreshTokenSuccess(newToken)),
        catchError(error => this.handleRefreshTokenError(error))
      );
  }

  private handleRefreshTokenSuccess(newToken: Token) {
    this.tokenStore.setToken(newToken);
  }

  private handleRefreshTokenError(error: HttpErrorResponse): Observable<never> {
    this.tokenStore.removeToken();
    return throwError(error);
  }

  isLoggedIn(): boolean {
    return this.tokenStore.isTokenExpired() === false;
  }

  getRole(): Role {
    return this.tokenStore.getRole();
  }

  getLogin(): string {
    return this.tokenStore.getLogin();
  }
}
