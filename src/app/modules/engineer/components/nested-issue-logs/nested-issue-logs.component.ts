import { Component, Input, OnInit } from '@angular/core';
import { IssueLogsComponent } from '../issue-logs/issue-logs.component';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-nested-issue-logs',
  templateUrl: '../issue-logs/issue-logs.component.html',
  styleUrls: ['../issue-logs/issue-logs.component.scss']
})
export class NestedIssueLogsComponent extends IssueLogsComponent implements OnInit {
  @Input() issue: Issue = null;

  ngOnInit() {
    // this.issueLogService.getEntitiesByIssueId(this.issue.id).subscribe(logs => {
    //   this.initTable();
    //   this.issueLogs = logs;
    //   this.loadLogs();
    // });
  }
}
