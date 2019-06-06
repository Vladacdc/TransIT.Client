import { Component, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Issue } from 'src/app/modules/shared/models/issue';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { Priority } from '../../models/priority/priority';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnDestroy, AfterViewInit {
  readonly options: DatatableSettings = new DatatableSettings({
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
      { data: 'date' },
      { data: 'summary' },
      { data: null, orderable: false }
    ],
    language: {
      url: 'assets/language.json'
    },
    scrollX: true,
    order: [[0, 'desc']]
  });

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
