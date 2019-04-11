import { Injectable } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private service: AuthentificationService, private router: Router) {}

  canActivate(): boolean {
    if (this.service.getRole() === 'GUEST') {
      return true;
    }

    if (this.service.getRole() === 'ADMIN') {
      this.router.navigate(['admin']);
      return false;
    }
  }
}
