import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { ActivatedRoute } from '@angular/router';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.scss']
})
export class EditIssueComponent implements OnInit {
  public issue: Issue;

  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssueService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.issue = new Issue(data);
      this.issueService.getEntity(data.id).subscribe(res => {
        this.issue = res;
      });
    });
  }
}
