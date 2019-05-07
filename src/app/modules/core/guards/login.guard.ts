import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/role/role';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  protected expectedRole: Role = 'GUEST';

  constructor(private service: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.service.getRole();
    if (role === this.expectedRole) {
      return true;
    }
    this.router.navigate([role.toLowerCase()]);
    return false;
  }
}
