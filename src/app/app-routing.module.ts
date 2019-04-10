import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/core/components/login/login.component';
import {AdminComponent} from './modules/admin/component/admin/admin.component';
import {UsersComponent} from './modules/admin/component/users/users.component';
import {CreateUserComponent} from './modules/admin/component/create-user/create-user.component';
import {VehiclesComponent} from './modules/admin/component/vehicles/vehicles.component';
import {MalfunctionsComponent} from './modules/admin/component/malfunctions/malfunctions.component';
import {ActionComponent} from './modules/admin/component/action/action.component';

const rout: Routes = [
      {path: 'users', component: UsersComponent},
      {path: 'user', component:  CreateUserComponent},
      {path: 'vehicles', component: VehiclesComponent},
      {path: 'malfunction', component: MalfunctionsComponent},
      {path: 'action', component: ActionComponent}
];

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin',
    component: AdminComponent, children: rout
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: 'users', component: UsersComponent},
  {path: 'user', component:  CreateUserComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'malfunction', component: MalfunctionsComponent},
  {path: 'action', component: ActionComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

