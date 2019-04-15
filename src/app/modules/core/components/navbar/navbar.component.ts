import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService) {}

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
