import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Token } from '../models/token/token';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap, catchError, finalize, switchMap } from 'rxjs/operators';
import { Observable, throwError, empty } from 'rxjs';
import { User } from '../models/user/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

const userToken = 'userToken';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private token: Token;

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router, private spinner: NgxSpinnerService) {
    const tokenString = localStorage.getItem(userToken);
    if (tokenString) {
      this.token = JSON.parse(tokenString);
      console.log(this.token);
      if (this.isTokenExpired()) {
        this.token = null;
        localStorage.removeItem(userToken);
      }
    }
  }

  getToken(): Token {
    return this.token;
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }
    const date = this.getTokenExpirationDate(this.token.accessToken);
    return !date || date.valueOf() <= new Date().valueOf();
  }

  login(login: string, password: string): Observable<User> {
    const timer = setTimeout(() => this.spinner.show(), 50);
    return this.http
      .post<Token>(`${environment.apiUrl}/login`, {
        login,
        password
      })
      .pipe(
        tap(token => this.handleSuccess(token)),
        map(token => token.user),
        catchError(error => this.handleError(error)),
        finalize(() => this.hideSpinner(timer))
      );
  }

  logout(): void {
    this.removeToken();
    this.toast.success('Successfully logged out', 'Logout');
    this.router.navigate(['login']);
  }

  refreshAccessToken(): Observable<User> {
    const { refreshToken, accessToken } = this.getToken();
    return this.http
      .post<Token>(`${environment.apiUrl}/refreshToken`, {
        accessToken,
        refreshToken
      })
      .pipe(
        tap(token => {
          console.log('Fetched refresh token', token);
          this.setToken(token);
        }),
        map(token => token.user),
        catchError((error: HttpErrorResponse) => {
          this.setToken(null);
          return throwError(error);
        })
      );
  }

  private setToken(token: Token): void {
    localStorage.setItem(userToken, JSON.stringify(token));
    this.token = token;
  }

  private hideSpinner(timer) {
    this.spinner.hide();
    clearTimeout(timer);
  }

  private getTokenExpirationDate(token: string): Date {
    try {
      const decoded: any = jwt_decode(token);
      if (decoded.exp == null) {
        return null;
      }
      const date = new Date(decoded.exp * 1000);
      return date;
    } catch (Error) {
      return null;
    }
  }

  private removeToken(): void {
    localStorage.removeItem(userToken);
    this.token = null;
  }

  private handleSuccess(token: Token): void {
    console.log('Fetched token: ', token);
    this.toast.success('Successfully signed in', 'Sign In');
    this.setToken(token);
    this.router.navigate(['']);
  }

  private handleError(httpResponse: HttpErrorResponse): Observable<any> {
    console.error('Error on login:', httpResponse);
    const { errors, message } = httpResponse.error;
    if (message) {
      this.toast.error(message, 'Sign in');
    }
    for (const field in errors) {
      if (field in errors) {
        for (const error of errors[field]) {
          this.toast.error(error, field);
          console.error(field, error);
        }
      }
    }
    return throwError(httpResponse);
  }
}
