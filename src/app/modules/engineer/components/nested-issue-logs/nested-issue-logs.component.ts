import { Component, Input, OnInit } from '@angular/core';
import { IssueLogsComponent } from '../issue-logs/issue-logs.component';
import { Issue } from '../../models/issue';
import { environment } from '../../../../../environments/environment';

declare const $;

@Component({
  selector: 'app-nested-issue-logs',
  templateUrl: '../issue-logs/issue-logs.component.html',
  styleUrls: ['../issue-logs/issue-logs.component.scss']
})
export class NestedIssueLogsComponent extends IssueLogsComponent implements OnInit {
  @Input() issue: Issue = null;

  private readonly ajaxSettings = {
    url: environment.apiUrl + '/datatable/issuelog',
    type: 'POST'
  };

  ngOnInit() {
    if (this.issue) {
      this.ajaxSettings.url = environment.apiUrl + `/datatable/issue/${this.issue.id}/issuelog`;
    }
    super.ngOnInit();
  }

  protected get tableConfig(): any {
    return {
      scrollX: true,
      select: {
        style: 'single'
      },
      columns: [
        { title: 'Статус', data: 'issue.state.transName', defaultContent: '' },
        { title: 'Творець', data: 'create.login', defaultContent: '' },
        { title: 'Витрати', data: 'expenses', defaultContent: '' },
        { title: 'Опис', data: 'description', defaultContent: '' },
        { title: 'Дія', data: 'actionType.name', defaultContent: '' },
        { title: 'Старий статус', data: 'oldState.transName', defaultContent: '' },
        { title: 'Новий статус', data: 'newState.transName', defaultContent: '' },
        { title: 'Постачальник', data: 'supplier.name', defaultContent: '' },
        { title: 'Транспорт', data: 'issue.vehicle.inventoryId', defaultContent: '' },
        { title: 'Створено', data: 'createDate', defaultContent: '' },
        { title: 'Редаговано', data: 'modDate', defaultContent: '' },
        { data: 'id', bVisible: false }
      ],
      processing: true,
      serverSide: true,
      ajax: this.ajaxSettings,
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    };
  }
}
