import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalystComponent } from './components/analyst/analyst.component';
import { AnalystRoutingModule } from './analyst-routing.module';
import { GlobalIssueComponent } from '../shared/components/global-issue/global-issue.component';
import { CoreModule } from '../core/core.module';
import { WebDataRocksPivot } from 'src/types/webdatarocks/webdatarocks.angular4';
import { ReportComponent } from './components/report/report.component';
import { SharedModule } from '../shared/shared.module';
import { MalfunctionReportComponent } from './components/report/malfunction-report/malfunction-report.component';
import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule, MatInputModule } from '@angular/material';
import { MalfunctionGroupReportComponent } from './components/report/malfunction-group-report/malfunction-group-report.component';
import { MalfunctionSubgroupReportComponent } from './components/report/malfunction-subgroup-report/malfunction-subgroup-report.component';

@NgModule({
  declarations: [
    AnalystComponent,
    GlobalIssueComponent,
    WebDataRocksPivot,
    ReportComponent,
    MalfunctionReportComponent,
    MalfunctionGroupReportComponent,
    MalfunctionSubgroupReportComponent,
  ],

  exports: [],
  imports: [
    CommonModule,
    AnalystRoutingModule,
    CoreModule,
    SharedModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class AnalystModule {}
