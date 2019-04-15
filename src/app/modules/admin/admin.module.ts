import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';

import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MatDialogModule } from '@angular/material/dialog';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { MatButtonModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { DialogComponent } from './component/dialog/dialog.component';
import { MalfunctionsComponent } from './component/malfunctions/malfunctions.component';
import { ActionComponent } from './component/action/action.component';
import { MalfuncComponent } from './component/malfunctions/malfunc/malfunc.component';
import { MalfuncGroupComponent } from './component/malfunctions/malfunc-group/malfunc-group.component';
import { MalfunSubgroupComponent } from './component/malfunctions/malfun-subgroup/malfun-subgroup.component';
import { CoreModule } from '../core/core.module';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { AdminNavbarComponent } from './component/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    CreateUserComponent,
    VehiclesComponent,
    DialogComponent,
    MalfunctionsComponent,
    ActionComponent,
    MalfuncComponent,
    MalfuncGroupComponent,
    MalfunSubgroupComponent,
    AdminNavbarComponent
  ],
  exports: [AdminComponent, MatDialogModule],
  imports: [
    CommonModule,
    CoreModule,
    AdminRoutingModule,
    FormsModule,
    DataTablesModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [RoleService, UserService]
})
export class AdminModule {}
