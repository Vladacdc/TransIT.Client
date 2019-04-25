import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  private table: DataTables.Api;

  issues: Issue[] = [];
  selectedIssue: Issue;

  private readonly tableConfig: DataTables.Settings = {
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    columns: [
      { title: 'Транспорт' },
      { title: 'Стан заявки' },
      { title: 'Несправність' },
      { title: 'Опис' },
      { title: 'Дії', orderable: false }
    ],
    columnDefs: [
      {
        targets: [0, 2, 3],
        render: data => {
          if (data.length > 22) {
            return data.substring(0, 20) + '...';
          }
          return data;
        }
      }
    ],
    scrollX: true
  };

  constructor(private issueService: IssueService, private toast: ToastrService) {}

  ngOnInit() {
    this.initializeTable();
    this.loadEntities();
  }

  private initializeTable(): void {
    this.table = $('#issues').DataTable(this.tableConfig);
    this.setUpDetailsButtonClick();
  }

  private setUpDetailsButtonClick(): void {
    $('#issues tbody').on('click', 'button', event => {
      const idTokens = event.currentTarget.id.split('-');
      const id = parseInt(idTokens[idTokens.length - 1], 10);
      this.selectedIssue = this.issues.find(i => i.id === id);
    });
  }

  private loadEntities(): void {
    this.issueService.getEntities().subscribe(issues => this.addIssues(issues));
  }

  addIssues(newIssues: Issue[]): void {
    this.issues = [...this.issues, ...newIssues];
    this.addIssuesToTable(newIssues);
  }

  private addIssuesToTable(newIssues: Issue[]) {
    const view = this.createTableView(newIssues);
    this.table.rows.add(view).draw();
  }

  private createTableView(issues: Issue[]): string[][] {
    return issues.map(issue => [
      issue.vehicle.name,
      issue.state.transName,
      issue.malfunction.name,
      issue.summary,
      `<button id="details-issue-${
        issue.id
      }" class="btn" data-toggle="modal" data-target="#editModal"><i class="fas fa-edit"></i></button>`
    ]);
  }

  deleteIssue(issueToDelete: Issue) {
    this.issues = this.issues.filter(i => i.id !== issueToDelete.id);
    this.removeIssueFromTable(issueToDelete);
  }

  private removeIssueFromTable(issue: Issue) {
    this.table
      .rows($(`button[id^="details-issue-${issue.id}"]`).parents('tr'))
      .remove()
      .draw(false);
  }
}
