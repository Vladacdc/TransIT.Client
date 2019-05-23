import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isLoggedOut(): boolean {
    return !this.isLoggedIn;
  }

  get userLogin(): string {
    return this.authService.getLogin();
  }
}
