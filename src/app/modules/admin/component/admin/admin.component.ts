import { Component } from '@angular/core';
import { SidebarService } from 'src/app/modules/admin/component/sidebar/sidebar.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent  {
  stateValue = '0';
  constructor(public sidebarservice: SidebarService) {}


  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    if (this.sidebarservice.getSidebarState()) {
      this.stateValue = '-300px';
    } else {
      this.stateValue = '0';
    }
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
}
