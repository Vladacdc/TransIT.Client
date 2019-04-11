import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private service: AuthentificationService) {}

  canActivate(): boolean {
    return this.service.getRole() === 'ADMIN';
  }
}
