import { Component, Input, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.scss']
})
export class EditIssueComponent implements OnInit {
  issue: Issue;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.issue = new Issue(data);
    });
  }
}
