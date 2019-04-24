import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.scss']
})
export class IssueDetailsComponent {
  @Input() issue: Issue;
  @Output() deleteIssue = new EventEmitter<Issue>();

  constructor(private issueService: IssueService, private toast: ToastrService) {}

  onDeleteClick(): void {
    this.sendDeleteRequest();
    this.hideModal();
  }

  private sendDeleteRequest(): void {
    this.issueService
      .deleteEntity(this.issue.id)
      .subscribe(
        () => this.deleteIssue.next(this.issue),
        () => this.toast.error('Не вдалось видалити заявку', 'Помилка видалення')
      );
  }

  private hideModal(): void {
    const modalWindow: any = $('#editModal');
    modalWindow.modal('hide');
  }

  get canDeleteIssue() {
    return this.issue && this.issue.state.name.toLowerCase() === 'new';
  }
}
