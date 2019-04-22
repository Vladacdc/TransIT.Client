import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EngineerGuard implements CanActivate {
  constructor(private service: AuthenticationService) {}

  canActivate(): boolean {
    return this.service.getRole() === 'ENGINEER';
  }
}
