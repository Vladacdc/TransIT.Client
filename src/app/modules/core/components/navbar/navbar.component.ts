import { Component } from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  collapsed = true;

  constructor(private authService: AuthentificationService) {}

  get isLoggedIn() {
    return !this.authService.isTokenExpired();
  }

  get isLoggedOut() {
    return this.authService.isTokenExpired();
  }

  get isCollapsed() {
    return this.collapsed;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.authService.logout();
  }
}
