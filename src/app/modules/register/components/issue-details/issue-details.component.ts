import { Component, Input } from '@angular/core';
import { Issue } from 'src/app/modules/shared/models/issue';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent {
  @Input() issue: Issue;
}
