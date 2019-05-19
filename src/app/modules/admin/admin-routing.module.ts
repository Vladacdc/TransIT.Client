import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './component/users/users.component';
import { VehiclesComponent } from './component/vehicles/vehicles.component';
import { MalfunctionsComponent } from './component/malfunctions/malfunctions.component';
import { MalfuncGroupComponent } from './component/malfunctions/malfunc-group/malfunc-group.component';
import { MalfunSubgroupComponent } from './component/malfunctions/malfun-subgroup/malfun-subgroup.component';
import { MalfuncComponent } from './component/malfunctions/malfunc/malfunc.component';
import { ActionComponent } from './component/action/action.component';
import { AdminComponent } from './component/admin/admin.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { VehicleTypeComponent } from './component/vehicle-type/vehicle-type.component';
import { DictionaryComponent } from '../shared/components/dictionaries/dictionary.component';
import { PostsComponent } from './component/posts/posts.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { GlobalDocumentComponent } from '../shared/components/global-document/global-document.component';
import { IssueLogComponent } from '../shared/components/issue-log/issue-log.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
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
      { path: 'supplier', component: SupplierComponent },
      { path: 'vehicle-types', component: VehicleTypeComponent },
      { path: 'documents', component: GlobalDocumentComponent },
      { path: 'issue-log', component: IssueLogComponent },
      { path: 'dictionary', component: DictionaryComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: '**', redirectTo: 'users' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
