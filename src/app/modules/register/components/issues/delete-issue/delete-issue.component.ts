import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Issue } from 'src/app/modules/shared/models/issue';
import { IssueService } from 'src/app/modules/shared/services/issue.service';

@Component({
  selector: 'app-delete-issue',
  templateUrl: './delete-issue.component.html',
  styleUrls: ['./delete-issue.component.scss']
})
export class DeleteIssueComponent {
  @Input() issue: Issue;
  @Output() deleteIssue = new EventEmitter<Issue>();

  constructor(private issueService: IssueService, private toast: ToastrService) {}

  delete(): void {
    this.issueService
      .deleteEntity(this.issue.id)
      .subscribe(
        () => this.deleteIssue.next(this.issue),
        () => this.toast.error('Не вдалось видалити заявку', 'Помилка видалення')
      );
  }
}
