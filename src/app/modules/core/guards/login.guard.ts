import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private service: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const role = this.service.getRole();
    if (role === 'GUEST') {
      return true;
    }
    this.router.navigate([role.toLowerCase()]);
    return false;
  }
}
