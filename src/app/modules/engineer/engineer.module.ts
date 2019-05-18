import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineerComponent } from './components/engineer/engineer.component';
import { IssuesComponent } from './components/issues/issues.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ActionTypeService } from './services/action-type.service';
import { StateService } from './services/state.service';
import { IssuelogService } from './services/issuelog.service';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { SupplierService } from './services/supplier.service';
import { DocumentService } from './services/document.service';
import { CreateDocumentComponent } from './components/create-document/create-document.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { SharedModule } from '../shared/shared.module';
import { IssueService } from '../shared/services/issue.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { IssueLogsComponent } from './components/issue-log-components/issue-logs/issue-logs.component';
import { EditIssueLogComponent } from './components/issue-log-components/edit-issue-log/edit-issue-log.component';
import { NestedIssueLogsComponent } from './components/issue-log-components/nested-issue-logs/nested-issue-logs.component';
import { IssueLogAssigneesComponent } from './components/issue-log-components/issue-log-assignees/issue-log-assignees.component';
import { IssueLogSuppliersComponent } from './components/issue-log-components/issue-log-suppliers/issue-log-suppliers.component';
import { IssueLogActionTypeComponent } from './components/issue-log-components/issue-log-action-type/issue-log-action-type.component';
import { IssueLogStateComponent } from './components/issue-log-components/issue-log-state/issue-log-state.component';

const routes: Routes = [
  {
    path: '',
    component: EngineerComponent,
    children: [
      { path: 'issues', component: IssuesComponent },
      { path: 'issues/edit', component: EditIssueComponent },
      { path: 'issue-logs', component: IssueLogsComponent },
      { path: 'issue-logs/edit', component: EditIssueLogComponent, data: [{isProd: true}] },
      { path: 'issue-logs/documents', component: DocumentsComponent },
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule
  ],
  exports: [RouterModule],
  declarations: [
    EditIssueComponent,
    EditIssueLogComponent,
    NestedIssueLogsComponent,
    CreateDocumentComponent,
    IssueLogAssigneesComponent,
    DocumentsComponent,
    IssueLogSuppliersComponent,
    IssueLogActionTypeComponent,
    IssueLogStateComponent
  ]
})
export class EngineerRoutingModule {}

@NgModule({
  declarations: [EngineerComponent, IssuesComponent, IssueLogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    EngineerRoutingModule
  ],
  providers: [IssueService, IssuelogService, StateService, ActionTypeService, SupplierService, DocumentService]
})
export class EngineerModule {}
