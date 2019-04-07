import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import {RouterModule, Routes} from '@angular/router';

// @ts-ignore
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
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    RouterModule.forRoot(routes)
  ]
})
export class AdminModule { }
