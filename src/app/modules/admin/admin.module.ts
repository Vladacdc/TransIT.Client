import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import {RouterModule, Routes} from '@angular/router';
import {UsersService} from './services/users.service';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
const routes: Routes = [
  {
    path: 'admin', children: [
      {path: '', component: UsersComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user', component:  CreateUserComponent}
      ]
  }
];
@NgModule({
  declarations: [AdminComponent, UsersComponent, CreateUserComponent],
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
    MatDialogModule
  ],
  entryComponents: [CreateUserComponent],
  providers: [
    UsersService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class AdminModule { }
