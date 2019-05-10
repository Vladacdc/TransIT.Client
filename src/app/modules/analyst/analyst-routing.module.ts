import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalystComponent } from './components/analyst/analyst.component';
import { IssueAnalystComponent } from './components/issue-analyst/issue-analyst.component';
import { IssueLogAnalystComponent } from './components/issue-log-analyst/issue-log-analyst.component';
import { ReportComponent } from './components/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: AnalystComponent,
    children: [
      { path: 'issues', component: IssueAnalystComponent },
      { path: 'issue-logs', component: IssueLogAnalystComponent },
      { path: 'report', component: ReportComponent },
      { path: '**', redirectTo: 'issues' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystRoutingModule {}
