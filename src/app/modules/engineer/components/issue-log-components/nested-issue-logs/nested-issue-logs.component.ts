import { Component, Input, OnInit } from '@angular/core';
import { IssueLogsComponent } from '../issue-logs/issue-logs.component';
import { Issue } from '../../../../shared/models/issue';

declare const $;

@Component({
  selector: 'app-nested-issue-logs',
  templateUrl: '../issue-logs/issue-logs.component.html',
  styleUrls: ['../issue-logs/issue-logs.component.scss']
})
export class NestedIssueLogsComponent extends IssueLogsComponent implements OnInit {
  @Input() issue: Issue = null;

  protected ajaxCallback(dataTablesParameters: any, callback): void {
    this.issueLogService.getFilteredEntitiesByIssueId(this.issue.id, dataTablesParameters).subscribe(callback);
  }

  ngOnInit() {
    this.initTable(this.tableConfig);
  }
}
