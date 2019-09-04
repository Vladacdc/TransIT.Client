// tslint:disable: max-line-length
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { MalfunctionsComponent } from './component/malfunctions/malfunctions.component';
import { MalfuncComponent } from './component/malfunctions/malfunc/malfunc.component';
import { MalfuncGroupComponent } from './component/malfunctions/malfunc-group/malfunc-group.component';
import { MalfunSubgroupComponent } from './component/malfunctions/malfun-subgroup/malfun-subgroup.component';
import { CoreModule } from '../core/core.module';
import { CreateVehicleComponent } from './component/vehicles/create-vehicle/create-vehicle.component';
import { EditVehicleComponent } from './component/vehicles/edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent } from './component/vehicles/delete-vehicle/delete-vehicle.component';
import { CreateMalfuncComponent } from './component/malfunctions/malfunc/create-malfunc/create-malfunc.component';
import { EditMalfuncComponent } from './component/malfunctions/malfunc/edit-malfunc/edit-malfunc.component';
import { DeleteMalfuncComponent } from './component/malfunctions/malfunc/delete-malfunc/delete-malfunc.component';
import { CreateMalfuncGroupComponent } from './component/malfunctions/malfunc-group/create-malfunc-group/create-malfunc-group.component';
import { EditMalfuncGroupComponent } from './component/malfunctions/malfunc-group/edit-malfunc-group/edit-malfunc-group.component';
import { DeleteMalfuncGroupComponent } from './component/malfunctions/malfunc-group/delete-malfunc-group/delete-malfunc-group.component';
import { CreateMalfuncSubgroupComponent } from './component/malfunctions/malfun-subgroup/create-malfunc-subgroup/create-malfunc-subgroup.component';
import { EditMalfuncSubgroupComponent } from './component/malfunctions/malfun-subgroup/edit-malfunc-subgroup/edit-malfunc-subgroup.component';
import { DeleteMalfuncSubgroupComponent } from './component/malfunctions/malfun-subgroup/delete-malfunc-subgroup/delete-malfunc-subgroup.component';
import { NgxMaskModule } from 'ngx-mask';
// ====User===
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/users/create-user/create-user.component';
import { EditUserComponent } from './component/users/edit-user/edit-user.component';
import { DeleteUserComponent } from './component/users/delete-user/delete-user.component';
import { RestoreUserPasswordComponent } from './component/users/restore-user-password/restore-user-password.component';
import { IsActiveModalComponent } from './component/users/is-active-modal/is-active-modal.component';
// =====VechicleType====
import { VehicleTypeComponent } from './component/vehicle-type/vehicle-type.component';
import { CreateVehicleTypeComponent } from './component/vehicle-type/create-vehicle-type/create-vehicle-type.component';
import { EditVehicleTypeComponent } from './component/vehicle-type/edit-vehicle-type/edit-vehicle-type.component';
import { DeleteVehicleTypeComponent } from './component/vehicle-type/delete-vehicle-type/delete-vehicle-type.component';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { SharedModule } from '../shared/shared.module';

import { PostsComponent } from './component/posts/posts.component';
import { CreatePostComponent } from './component/posts/create-post/create-post.component';
import { EditPostComponent } from './component/posts/edit-post/edit-post.component';
import { DeletePostComponent } from './component/posts/delete-post/delete-post.component';

import { AttachUserComponent } from './component/employees/attach-user/attach-user.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { CreateEmployeeComponent } from './component/employees/create-employee/create-employee.component';
import { EditEmployeeComponent } from './component/employees/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './component/employees/delete-employee/delete-employee.component';
import { ActionStateDictionaryComponent } from './component/action-state-dictionary/action-state-dictionary.component';
import { StateDictionaryComponent } from './component/action-state-dictionary/state-dictionary/state-dictionary.component';
import { ActionDictionaryComponent } from './component/action-state-dictionary/action-dictionary/action-dictionary.component';
import { CreateStateComponent } from './component/action-state-dictionary/state-dictionary/create-state/create-state.component';
import { DeleteStateComponent } from './component/action-state-dictionary/state-dictionary/delete-state/delete-state.component';
import { EditStateComponent } from './component/action-state-dictionary/state-dictionary/edit-state/edit-state.component';
import { CreateActionComponent } from './component/action-state-dictionary/action-dictionary/create-action/create-action.component';
import { EditActionComponent } from './component/action-state-dictionary/action-dictionary/edit-action/edit-action.component';
import { DeleteActionComponent } from './component/action-state-dictionary/action-dictionary/delete-action/delete-action.component';
import { TransitionDictionaryComponent } from './component/action-state-dictionary/transition-dictionary/transition-dictionary.component';
import { CreateTransitionComponent } from './component/action-state-dictionary/transition-dictionary/create-transition/create-transition.component';
import { EditTransitionComponent } from './component/action-state-dictionary/transition-dictionary/edit-transition/edit-transition.component';
import { DeleteTransitionComponent } from './component/action-state-dictionary/transition-dictionary/delete-transition/delete-transition.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LocationsComponent } from './component/locations/locations.component';
import { CreateLocationComponent } from './component/locations/create-location/create-location.component';
import { EditLocationComponent } from './component/locations/edit-location/edit-location.component';
import { DeleteLocationComponent } from './component/locations/delete-location/delete-location.component';
import { MatTableModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatCardModule } from '@angular/material';
import { InfoVehicleComponent } from './component/vehicles/info-vehicle/info-vehicle.component';
import { MatFspTableComponent } from '../shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { PartsComponent } from './component/parts/parts.component';
import { CreatePartComponent } from './component/parts/create-part/create-part.component';
import { EditPartComponent } from './component/parts/edit-part/edit-part.component';
import { DeletePartComponent } from './component/parts/delete-part/delete-part.component';

@NgModule({
  declarations: [
    AdminComponent,
    // ====User===
    UsersComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    IsActiveModalComponent,
    RestoreUserPasswordComponent,
    // ====Vehicles===
    VehiclesComponent,
    CreateVehicleComponent,
    EditVehicleComponent,
    DeleteVehicleComponent,
    // ====VehiclesType===
    DeleteVehicleTypeComponent,
    VehicleTypeComponent,
    CreateVehicleTypeComponent,
    EditVehicleTypeComponent,
    InfoVehicleComponent,
    // ====Mulfunction===
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
    // ====Post===
    PostsComponent,
    CreatePostComponent,
    EditPostComponent,
    DeletePostComponent,
    EmployeesComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    DeleteEmployeeComponent,
    AttachUserComponent,
    ActionStateDictionaryComponent,
    StateDictionaryComponent,
    ActionDictionaryComponent,
    CreateStateComponent,
    DeleteStateComponent,
    EditStateComponent,
    CreateActionComponent,
    EditActionComponent,
    DeleteActionComponent,
    TransitionDictionaryComponent,
    CreateTransitionComponent,
    EditTransitionComponent,
    DeleteTransitionComponent,
    LocationsComponent,
    CreateLocationComponent,
    EditLocationComponent,
    DeleteLocationComponent,
    PartsComponent,
    CreatePartComponent,
    EditPartComponent,
    DeletePartComponent
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
    // Materials
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgBootstrapFormValidationModule,
    NgSelectModule
  ]
})
export class AdminModule {}
