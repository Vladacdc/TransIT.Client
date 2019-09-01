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
import { MatPaginatorModule, MatSortModule, MatFormFieldModule, MatTableModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { MalfunctionGroupReportComponent } from './components/report/malfunction-group-report/malfunction-group-report.component';
import { MalfunctionSubgroupReportComponent } from './components/report/malfunction-subgroup-report/malfunction-subgroup-report.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AnalystComponent,
    WebDataRocksPivot,
    ReportComponent,
    MalfunctionReportComponent,
    MalfunctionGroupReportComponent,
    MalfunctionSubgroupReportComponent,
    ChartsComponent
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
    MatSortModule,
    MatDatepickerModule,
    ChartsModule,
    FormsModule,
    NgSelectModule
  ]
})
export class AnalystModule {}
