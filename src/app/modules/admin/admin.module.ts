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
//====User===
import { UserService } from './services/user.service';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/users/create-user/create-user.component';
import { EditUserComponent } from './component/users/edit-user/edit-user.component';
import { DeleteUserComponent } from './component/users/delete-user/delete-user.component';
import { RestoreUserPasswordComponent } from './component/users/restore-user-password/restore-user-password.component';
import { IsActiveModalComponent } from './component/users/is-active-modal/is-active-modal.component';
//=====VechicleType====
import { VehicleTypeComponent } from './component/vehicle-type/vehicle-type.component';
import { CreateVehicleTypeComponent } from './component/create-vehicle-type/create-vehicle-type.component';
import { EditVehicleTypeComponent } from './component/edit-vehicle-type/edit-vehicle-type.component';
import { DeleteVehicleTypeComponent } from './component/delete-vehicle-type/delete-vehicle-type.component';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { IssueLogComponent } from './component/issue-log/issue-log.component';

import { DocumentsComponent } from './component/documents/documents.component';
import { CreateDocumentComponent } from './component/documents/create-document/create-document.component';
import { DeleteDocumentComponent } from './component/documents/delete-document/delete-document.component';
import { EditDocumentComponent } from './component/documents/edit-document/edit-document.component';
import { NestedDocumentComponent } from './component/documents/nested-document/nested-document.component';

import { SharedModule } from '../shared/shared.module';
import { PostsComponent } from './component/posts/posts.component';
import { CreatePostComponent } from './component/posts/create-post/create-post.component';
import { EditPostComponent } from './component/posts/edit-post/edit-post.component';
import { DeletePostComponent } from './component/posts/delete-post/delete-post.component';
import { EmployeeService } from './services/employee.service';
import { PostService } from './services/post.service';
import { EmployeesComponent } from './component/employees/employees.component';
import { CreateEmployeeComponent } from './component/employees/create-employee/create-employee.component';
import { EditEmployeeComponent } from './component/employees/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './component/employees/delete-employee/delete-employee.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    //====User===
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    IsActiveModalComponent,
    RestoreUserPasswordComponent,
    //====Action===
    ActionComponent,
    //====Vehicles===
    VehiclesComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    DeleteVehicleComponent,
    //====VehiclesType===
    DeleteVehicleTypeComponent,
    VehicleTypeComponent,
    CreateVehicleTypeComponent,
    EditVehicleTypeComponent,
    //====Mulfunction===
    MalfuncComponent,
    MalfuncGroupComponent,
    MalfunSubgroupComponent,
    CreateMalfuncGroupComponent,
    CreateMalfuncComponent,
    CreateMalfuncSubgroupComponent,
    MalfunctionsComponent,
    EditMalfuncSubgroupComponent,
    DeleteMalfuncSubgroupComponent,
    EditMalfuncGroupComponent,
    DeleteMalfuncGroupComponent,
    EditMalfuncComponent,
    DeleteMalfuncComponent,
    //====Supplier===
    SupplierComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    DeleteSupplierComponent,
    //====Issue===
    IssueLogComponent,
    //====Document===
    DocumentsComponent,
    CreateDocumentComponent,
    DeleteDocumentComponent,
    EditDocumentComponent,
    NestedDocumentComponent,
    PostsComponent,
    CreatePostComponent,
    EditPostComponent,
    DeletePostComponent,
    EmployeesComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    DeleteEmployeeComponent
  ],
  exports: [AdminComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgBootstrapFormValidationModule
  ],
  providers: [RoleService, UserService, PostService, EmployeeService]
})
export class AdminModule {}
