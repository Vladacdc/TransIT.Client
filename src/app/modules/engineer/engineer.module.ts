import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerComponent } from './components/engineer/engineer.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssueLogsComponent } from './components/issue-logs/issue-logs.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ActionTypeService} from './services/action-type.service';
import {StateService} from './services/state.service';
import {IssuelogService} from './services/issuelog.service';
import {IssueService} from './services/issue.service';

const routes: Routes = [
  {
    path: '',
    component: EngineerComponent,
    children: [
      { path: 'issues', component: IssuesComponent },
      { path: 'issue-logs', component: IssueLogsComponent },
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineerRoutingModule {}

@NgModule({
  declarations: [EngineerComponent, IssuesComponent, IssueLogsComponent],
  imports: [
    CommonModule,
    CoreModule,
    EngineerRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [
    IssueService,
    IssuelogService,
    StateService,
    ActionTypeService
  ]
})
export class EngineerModule { }
