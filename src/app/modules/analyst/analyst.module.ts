import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalystComponent } from './component/analyst/analyst.component';
import { AnalystRoutingModule } from './analyst-routing.module';
import { IssueAnalystComponent } from './component/issue-analyst/issue-analyst.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [AnalystComponent, IssueAnalystComponent],
  exports: [],
  imports: [CommonModule, AnalystRoutingModule, CoreModule]
})
export class AnalystModule {}
