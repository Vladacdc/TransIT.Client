import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
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
  MatTableModule, MatTabsModule
} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { DialogComponent } from './component/dialog/dialog.component';
import { MalfunctionsComponent } from './component/malfunctions/malfunctions.component';
import { ActionComponent } from './component/action/action.component';
@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    CreateUserComponent,
    VehiclesComponent,
    DialogComponent,
    MalfunctionsComponent,
    ActionComponent],
  exports: [
    AdminComponent,
    MatDialogModule
  ],
  imports: [
    CommonModule,
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
  entryComponents: [CreateUserComponent],
  providers: [
    UsersService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class AdminModule { }
