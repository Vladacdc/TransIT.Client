import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
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
import { EditUserComponent } from './component/edit-user/edit-user.component';

import { CreateVehicleComponent } from './component/create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './component/edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent } from './component/delete-vehicle/delete-vehicle.component';

import { CreateMalfuncGroupComponent } from './component/create-malfunc-group/create-malfunc-group.component';
import { CreateMalfuncComponent } from './component/create-malfunc/create-malfunc.component';
import { CreateMalfuncSubgroupComponent } from './component/create-malfunc-subgroup/create-malfunc-subgroup.component';
import { EditMalfuncSubgroupComponent } from './component/edit-malfunc-subgroup/edit-malfunc-subgroup.component';
import { DeleteMalfuncSubgroupComponent } from './component/delete-malfunc-subgroup/delete-malfunc-subgroup.component';
import { EditMalfuncGroupComponent } from './component/edit-malfunc-group/edit-malfunc-group.component';
import { DeleteMalfuncGroupComponent } from './component/delete-malfunc-group/delete-malfunc-group.component';
import { NgxMaskModule } from 'ngx-mask';


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
    AdminNavbarComponent,
    EditUserComponent,

    CreateVehicleComponent,
    EditVehicleComponent,
    DeleteVehicleComponent,

    CreateMalfuncGroupComponent,
    CreateMalfuncComponent,
    CreateMalfuncSubgroupComponent,
    EditMalfuncSubgroupComponent,
    DeleteMalfuncSubgroupComponent,
    EditMalfuncGroupComponent,
    DeleteMalfuncGroupComponent

  ],
  exports: [AdminComponent],
  imports: [CommonModule,
            CoreModule,
            AdminRoutingModule,
            FormsModule,
            DataTablesModule,
            HttpClientModule,
            ReactiveFormsModule,
            NgxMaskModule.forRoot()],
  providers: [RoleService,
              UserService]
})
export class AdminModule {}
