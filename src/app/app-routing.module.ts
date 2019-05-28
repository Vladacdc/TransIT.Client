import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/core/components/login/login.component';
import { LoginGuard } from './modules/core/guards/login.guard';
import { AdminGuard } from './modules/core/guards/admin.guard';
import { EngineerGuard } from './modules/core/guards/engineer.guard';
import { RegisterGuard } from './modules/core/guards/register.guard';
import { AnalystGuard } from './modules/core/guards/analyst.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'engineer',
    loadChildren: './modules/engineer/engineer.module#EngineerModule',
    canActivate: [EngineerGuard]
  },
  {
    path: 'analyst',
    loadChildren: './modules/analyst/analyst.module#AnalystModule',
    canActivate: [AnalystGuard]
  },
  {
    path: 'register',
    loadChildren: './modules/register/register.module#RegisterModule',
    canActivate: [RegisterGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
