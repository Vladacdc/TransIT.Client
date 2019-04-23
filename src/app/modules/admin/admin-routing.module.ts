import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './component/users/users.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { MalfunctionsComponent } from './component/malfunctions/malfunctions.component';
import { MalfuncGroupComponent } from './component/malfunctions/malfunc-group/malfunc-group.component';
import { MalfunSubgroupComponent } from './component/malfunctions/malfun-subgroup/malfun-subgroup.component';
import { MalfuncComponent } from './component/malfunctions/malfunc/malfunc.component';
import { ActionComponent } from './component/action/action.component';
import { AdminComponent } from './component/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: CreateUserComponent },
      { path: 'vehicles', component: VehiclesComponent },
      {
        path: 'malfunctions',
        component: MalfunctionsComponent,
        children: [
          { path: 'malfunc-group', component: MalfuncGroupComponent },
          { path: 'malfunc-subgroup', component: MalfunSubgroupComponent },
          { path: 'malfunc', component: MalfuncComponent }
        ]
      },
      { path: 'actions', component: ActionComponent },
      { path: '**', redirectTo: 'users' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
