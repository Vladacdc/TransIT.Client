import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './component/users/users.component';
import {AdminComponent} from './component/admin/admin.component';
import {CreateUserComponent} from './component/create-user/create-user.component';

const routes: Routes = [
  {path: 'admin', children: [
      {path: '', component: AdminComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user', component:  CreateUserComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
