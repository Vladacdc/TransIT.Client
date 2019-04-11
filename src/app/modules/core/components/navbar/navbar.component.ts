import { Component } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthentificationService) {}

  get isLoggedIn() {
    return !this.authService.isTokenExpired();
  }

  get isLoggedOut() {
    return this.authService.isTokenExpired();
  }

  logout() {
    this.authService.logout();
  }
}
