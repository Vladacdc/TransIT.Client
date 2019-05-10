import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalystComponent } from './components/analyst/analyst.component';
import { AnalystRoutingModule } from './analyst-routing.module';
import { IssueAnalystComponent } from './components/issue-analyst/issue-analyst.component';
import { CoreModule } from '../core/core.module';
import { IssueLogAnalystComponent } from './components/issue-log-analyst/issue-log-analyst.component';
import { WebDataRocksPivot } from 'src/types/webdatarocks/webdatarocks.angular4';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [AnalystComponent, IssueAnalystComponent, IssueLogAnalystComponent, WebDataRocksPivot, ReportComponent],
  exports: [],
  imports: [CommonModule, AnalystRoutingModule, CoreModule]
})
export class AnalystModule {}
