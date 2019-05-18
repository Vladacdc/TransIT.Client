import { Component, Input, OnInit } from '@angular/core';
import { IssueLogsComponent } from '../issue-logs/issue-logs.component';
import { Issue } from '../../../../shared/models/issue';

declare const $;

@Component({
  selector: 'app-nested-issue-logs',
  templateUrl: '../issue-logs/issue-logs.component.html',
  styleUrls: ['../issue-logs/issue-logs.component.scss']
})
export class NestedIssueLogsComponent extends IssueLogsComponent implements OnInit {
  @Input() issue: Issue = null;

  protected readonly tableConfig: any = {
      scrollX: true,
      select: {
        style: 'single'
      },
      columns: [
        { title: 'Статус', data: 'issue.state.transName', defaultContent: '', bVisible: false },
        { title: 'Творець', data: 'create.login', defaultContent: '' },
        { title: 'Витрати', data: 'expenses', defaultContent: '' },
        { title: 'Опис', data: 'description', defaultContent: '' },
        { title: 'Дія', data: 'actionType.name', defaultContent: '' },
        { title: 'Старий статус', data: 'oldState.transName', defaultContent: '' },
        { title: 'Новий статус', data: 'newState.transName', defaultContent: '' },
        { title: 'Постачальник', data: 'supplier.name', defaultContent: '' },
        { title: 'Транспорт', data: 'issue.vehicle.inventoryId', defaultContent: '' },
        { title: 'Створено', data: 'createDate', defaultContent: '' },
        { title: 'Редаговано', data: 'modDate', defaultContent: '', bVisible: false },
        { data: 'id', bVisible: false }
      ],
      processing: true,
      serverSide: true,
      ajax: this.ajaxCallback.bind(this),
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
  };

  protected ajaxCallback(dataTablesParameters: any, callback): void {
    this.issueLogService.getFilteredEntitiesByIssueId(this.issue.id, dataTablesParameters).subscribe(callback);
  }

  ngOnInit() {
    this.initTable(this.tableConfig);
  }
}
