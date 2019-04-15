import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private service: AuthenticationService) {}

  canActivate(): boolean {
    return this.service.getRole() === 'ADMIN';
  }
}
