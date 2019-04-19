import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private service: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.service.getRole() === 'GUEST') {
      return true;
    }

    if (this.service.getRole() === 'ADMIN') {
      this.router.navigate(['admin']);
      return false;
    }

    if (this.service.getRole() === 'CUSTOMER') {
      this.router.navigate(['customer']);
      return false;
    }
  }
}
