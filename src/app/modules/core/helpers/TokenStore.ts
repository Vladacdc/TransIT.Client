import { Injectable } from '@angular/core';
import { Token } from '../models/token/token';
import { TokenPayload } from '../models/tokenPayload/tokenPayload';
import { Role } from '../models/role/role';

const USER_TOKEN_STORE = 'userToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStore {
  private token: Token;

  constructor() {
    const tokenString = localStorage.getItem(USER_TOKEN_STORE);
    if (tokenString) {
      this.parseTokenString(tokenString);
    }
  }

  private parseTokenString(tokenString: string): void {
    this.token = JSON.parse(tokenString);
    if (this.isTokenExpired()) {
      this.removeToken();
    }
  }

  isTokenExpired(): boolean {
    if (!this.token) {
      return true;
    }

    const date = this.getTokenExpirationDate(this.token.refreshToken);
    return date.valueOf() <= new Date().valueOf();
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = this.getTokenPayload(token);
    const date = new Date(decoded.exp * 1000);
    return date;
  }

  private getTokenPayload(token: string): TokenPayload {
    const encodedTokenPayload = token.split('.')[1];
    const decodedTokenPayload = atob(encodedTokenPayload);
    const tokenPayload = JSON.parse(decodedTokenPayload) as TokenPayload;
    return tokenPayload;
  }

  getToken(): Token {
    return this.token;
  }

  removeToken(): void {
    localStorage.removeItem(USER_TOKEN_STORE);
    this.token = null;
  }

  setToken(token: Token): void {
    localStorage.setItem(USER_TOKEN_STORE, JSON.stringify(token));
    this.token = token;
  }

  getRole(): Role {
    if (this.isTokenExpired()) {
      return 'GUEST';
    }

    const refreshToken = this.token.refreshToken;
    const tokenPayload = this.getTokenPayload(refreshToken);
    return tokenPayload.role;
  }
}
