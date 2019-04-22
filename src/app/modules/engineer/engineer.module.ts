import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerComponent } from './components/engineer/engineer.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssueLogsComponent } from './components/issue-logs/issue-logs.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ActionTypeService} from './services/action-type.service';
import {StateService} from './services/state.service';
import {IssuelogService} from './services/issuelog.service';
import {IssueService} from './services/issue.service';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { EditIssueLogComponent } from './components/edit-issue-log/edit-issue-log.component';
import { NestedIssueLogsComponent } from './components/nested-issue-logs/nested-issue-logs.component';
import {SupplierService} from './services/supplier.service';
import {DocumentService} from './services/document.service';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { IssueLogAssigneesComponent } from './components/issue-log-assignees/issue-log-assignees.component';

const routes: Routes = [
  {
    path: '',
    component: EngineerComponent,
    children: [
      { path: 'issues', component: IssuesComponent },
      { path: 'issues/edit', component: EditIssueComponent },
      { path: 'issue-logs', component: IssueLogsComponent },
      { path: 'issue-logs/edit', component: EditIssueLogComponent },
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  declarations: [
    EditIssueComponent,
    EditIssueLogComponent,
    NestedIssueLogsComponent,
    CreateDocumentComponent,
    IssueLogAssigneesComponent
  ]
})
export class EngineerRoutingModule {}

@NgModule({
  declarations: [
    EngineerComponent,
    IssuesComponent,
    IssueLogsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    CoreModule,
    EngineerRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    IssueService,
    IssuelogService,
    StateService,
    ActionTypeService,
    SupplierService,
    DocumentService
  ]
})
export class EngineerModule { }
