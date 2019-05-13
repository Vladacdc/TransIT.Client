import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalIssueComponent } from './components/global-issue/global-issue.component';

@NgModule({
  declarations: [GlobalIssueComponent],
  imports: [CommonModule],
  exports: [GlobalIssueComponent]
})
export class SharedModule {}
