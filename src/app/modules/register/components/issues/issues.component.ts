import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue, Priority } from '../../models/issue';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnDestroy, AfterViewInit {
  options: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      this.issueService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.issues = response.data;
        callback({ ...response, data: [] });
        this.adjustColumns();
      });
    },
    columns: [
      { data: 'number' },
      { data: 'vehicle.model' },
      { data: 'state.transName' },
      { data: 'malfunction.name' },
      { data: 'summary' },
      { data: null, orderable: false }
    ],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    scrollX: true
  };

  issues: Issue[] = [];
  selectedIssue: Issue;
  renderTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  constructor(private issueService: IssueService) {}

  ngAfterViewInit(): void {
    this.renderTrigger.next();
  }

  ngOnDestroy(): void {
    this.renderTrigger.unsubscribe();
  }

  reloadTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.renderTrigger.next();
    });
  }

  selectIssue(issue: Issue) {
    this.selectedIssue = new Issue({ ...issue });
  }

  getPriorityClass(issue: Issue) {
    return `priority-${Priority[issue.priority]}`;
  }

  private adjustColumns() {
    setTimeout(() => $(window).trigger('resize'), 0);
  }
}
