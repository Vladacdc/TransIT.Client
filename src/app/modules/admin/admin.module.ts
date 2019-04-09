import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import {RouterModule, Routes} from '@angular/router';
import {UsersService} from './services/users.service';

import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { DialogComponent } from './component/dialog/dialog.component';
const routes: Routes = [
  {
    path: 'admin', children: [
      {path: '', component: UsersComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user', component:  CreateUserComponent},
      {path: 'vehicles', component: VehiclesComponent}
      ]
  }
];
@NgModule({
  declarations: [AdminComponent, UsersComponent, CreateUserComponent, VehiclesComponent, DialogComponent],
  exports: [
    AdminComponent,
    MatDialogModule
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    DataTablesModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  entryComponents: [CreateUserComponent],
  providers: [
    UsersService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class AdminModule { }
