import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { MalfunctionsComponent } from './component/malfunctions/malfunctions.component';
import { ActionComponent } from './component/action/action.component';
import { MalfuncComponent } from './component/malfunctions/malfunc/malfunc.component';
import { MalfuncGroupComponent } from './component/malfunctions/malfunc-group/malfunc-group.component';
import { MalfunSubgroupComponent } from './component/malfunctions/malfun-subgroup/malfun-subgroup.component';
import { CoreModule } from '../core/core.module';
import { AdminNavbarComponent } from './component/admin-navbar/admin-navbar.component';
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
import { CreateSupplierComponent } from './component/supplier/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './component/supplier/edit-supplier/edit-supplier.component';
import { DeleteSupplierComponent } from './component/supplier/delete-supplier/delete-supplier.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { EditMalfuncComponent } from './component/edit-malfunc/edit-malfunc.component';
import { DeleteMalfuncComponent } from './component/delete-malfunc/delete-malfunc.component';
import { RoleService } from './services/role.service';

import { UserService } from './services/user.service';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/users/create-user/create-user.component';
import { EditUserComponent } from './component/users/edit-user/edit-user.component';
import { DeleteUserComponent } from './component/users/delete-user/delete-user.component';
import { RestoreUserPasswordComponent } from './component/users/restore-user-password/restore-user-password.component';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { IsActiveModalComponent } from './component/users/is-active-modal/is-active-modal.component';

import { VehicleTypeComponent } from './component/vehicle-type/vehicle-type.component';
import { CreateVehicleTypeComponent } from './component/create-vehicle-type/create-vehicle-type.component';
import { EditVehicleTypeComponent } from './component/edit-vehicle-type/edit-vehicle-type.component';
import { DeleteVehicleTypeComponent } from './component/delete-vehicle-type/delete-vehicle-type.component';

import { DocumentsComponent } from './component/documents/documents.component';
import { IssueLogComponent } from './component/issue-log/issue-log.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    CreateUserComponent,
    VehiclesComponent,
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
    MalfunctionsComponent,
    EditMalfuncSubgroupComponent,
    DeleteMalfuncSubgroupComponent,
    EditMalfuncGroupComponent,
    DeleteMalfuncGroupComponent,
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    EditMalfuncComponent,
    DeleteMalfuncComponent,
    DeleteUserComponent,
    RestoreUserPasswordComponent,
    IsActiveModalComponent,
    VehicleTypeComponent,
    CreateVehicleTypeComponent,
    EditVehicleTypeComponent,
    DeleteVehicleTypeComponent,
    DocumentsComponent,
    IssueLogComponent

  ],
  exports: [AdminComponent],
  imports: [
    CommonModule,
    CoreModule,
    AdminRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgBootstrapFormValidationModule
  ],
  providers: [RoleService, UserService]
})
export class AdminModule {}
