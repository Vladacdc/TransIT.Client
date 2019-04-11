import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Token } from '../models/token/token';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Role } from '../models/role/role';
import { SpinnerService } from './spinner.service';

const userToken = 'userToken';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private token: Token;

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router, private spinner: SpinnerService) {
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

  getRole(): Role {
    const decoded: any = jwt_decode(this.getToken().accessToken);
    if (decoded.role) {
      return decoded.role;
    }

    return null;
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }
    const date = this.getTokenExpirationDate();
    return !date || date.valueOf() <= new Date().valueOf();
  }

  login(login: string, password: string): Observable<Token> {
    const timer = setTimeout(() => this.spinner.show(), 50);
    return this.http
      .post<Token>(`${environment.apiUrl}/authentication/signin`, {
        login,
        password
      })
      .pipe(
        tap(token => this.handleSuccess(token)),
        catchError(error => this.handleError(error)),
        finalize(() => this.hideSpinner(timer))
      );
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['login']);
  }

  refreshAccessToken(): Observable<Token> {
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

  private getTokenExpirationDate(): Date {
    const decoded: any = jwt_decode(this.getToken().refreshToken);
    if (decoded.exp == null) {
      return null;
    }
    const date = new Date(decoded.exp * 1000);
    return date;
  }

  private removeToken(): void {
    localStorage.removeItem(userToken);
    this.token = null;
  }

  private handleSuccess(token: Token): void {
    console.log('Fetched token: ', token);
    this.setToken(token);
    this.router.navigate(['']);
  }

  private handleError(httpResponse: HttpErrorResponse): Observable<any> {
    console.error('Error on login:', httpResponse);
    if (httpResponse.status !== 0) {
      this.toast.error('Неправильно введений логін або пароль', 'Помилка логування');
      const { errors } = httpResponse.error;
      for (const field in errors) {
        if (field in errors) {
          for (const error of errors[field]) {
            this.toast.error(error, field);
            console.error(field, error);
          }
        }
      }
    }
    return throwError(httpResponse);
  }
}
