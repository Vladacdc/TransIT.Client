import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalystComponent } from './components/analyst/analyst.component';
import { AnalystRoutingModule } from './analyst-routing.module';
import { IssueAnalystComponent } from './components/issue-analyst/issue-analyst.component';
import { CoreModule } from '../core/core.module';
import { WebDataRocksPivot } from 'src/types/webdatarocks/webdatarocks.angular4';
import { ReportComponent } from './components/report/report.component';
import { GlobalIssueComponent } from '../shared/components/global-issue/global-issue.component';

@NgModule({
  declarations: [
    AnalystComponent,
    IssueAnalystComponent,
    WebDataRocksPivot,
    ReportComponent,
    GlobalIssueComponent
  ],
  exports: [],
  imports: [CommonModule, AnalystRoutingModule, CoreModule]
})
export class AnalystModule {}
