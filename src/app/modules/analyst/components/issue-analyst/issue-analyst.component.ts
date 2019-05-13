import { Component, OnInit } from '@angular/core';
import { IssueService } from 'src/app/modules/shared/services/issue.service';

@Component({
  selector: 'app-issue-analyst',
  providers: [IssueService],
  templateUrl: './issue-analyst.component.html',
  styleUrls: ['./issue-analyst.component.scss']
})
export class IssueAnalystComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
