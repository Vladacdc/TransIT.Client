import { Injectable } from '@angular/core';
import { Token } from '../models/token/token';
import { TokenPayload } from '../models/tokenPayload/tokenPayload';
import { Role } from '../models/role/role';
import { ChannelMessage } from './channel-message';

const USER_TOKEN_STORE = 'userToken';
const TRANS_IT_CHANNEL = 'TransITChannel';

@Injectable({
  providedIn: 'root'
})
export class TokenStore {
  private token: Token;
  private channel = new BroadcastChannel(TRANS_IT_CHANNEL);

  constructor() {
    const tokenString = sessionStorage.getItem(USER_TOKEN_STORE);
    if (tokenString) {
      this.parseTokenString(tokenString);
    } else {
      this.requestStorage();
    }
    this.setUpChannel();
  }

  private requestStorage() {
    this.channel.postMessage({ command: 'getStorage' });
  }

  private setUpChannel() {
    this.channel.onmessage = event => {
      const message: ChannelMessage = event.data;
      switch (message.command) {
        case 'getStorage':
          this.shareStorage();
          break;
        case 'shareStorage':
          this.getStorage(message.token);
          break;
        case 'cleanStorage':
          this.cleanStorage();
          break;
      }
    };
  }

  private shareStorage() {
    if (this.token) {
      this.channel.postMessage({ command: 'shareStorage', token: this.token });
    }
  }

  private getStorage(token: Token) {
    if (JSON.stringify(this.token) !== JSON.stringify(token)) {
      this.setToken(token);
      location.reload();
    }
  }

  private cleanStorage() {
    if (this.token) {
      this.removeToken();
      location.reload();
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

    const date = this.getTokenExpirationDate(this.getRefreshToken());
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

  private getRefreshToken(): string {
    return this.token && this.token.refreshToken;
  }

  getLogin(): string {
    if (this.isTokenExpired()) {
      return '';
    }

    const tokenPayload = this.getTokenPayload(this.getRefreshToken());
    return tokenPayload.login;
  }

  getRole(): Role {
    if (this.isTokenExpired()) {
      return 'GUEST';
    }

    const tokenPayload = this.getTokenPayload(this.getRefreshToken());
    return tokenPayload.role;
  }

  getToken(): Token {
    return this.token;
  }

  removeToken(): void {
    sessionStorage.removeItem(USER_TOKEN_STORE);
    this.channel.postMessage({ command: 'cleanStorage' });
    this.token = null;
  }

  setToken(token: Token): void {
    sessionStorage.setItem(USER_TOKEN_STORE, JSON.stringify(token));
    this.channel.postMessage({ command: 'shareStorage', token });
    this.token = token;
  }
}
