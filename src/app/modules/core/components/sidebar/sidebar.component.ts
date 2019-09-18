import {Component, Input, ViewChild, OnInit, HostListener} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
export class SidebarComponent {
    mode: string;
    @Input() pageTemplate: any;
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.mode = window.innerWidth >= 768 ? 'side' : 'push';
    }

    constructor(private authService: AuthenticationService) {
        this.mode = window.innerWidth >= 768 ? 'side' : 'push';
    }

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
