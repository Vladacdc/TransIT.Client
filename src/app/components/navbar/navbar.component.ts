import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  collapsed = true;

  get isLoggedIn() {
    return false;
  }

  get isLoggedOut() {
    return true;
  }

  get isCollapsed() {
    return this.collapsed;
  }

  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }

  constructor() {}

  ngOnInit() {}
}
