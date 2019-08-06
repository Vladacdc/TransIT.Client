import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import * as moment from 'moment';
import { DocumentService } from 'src/app/modules/shared/services/document.service';

declare const $;

@Component({
  selector: 'app-issue-logs',
  templateUrl: './issue-logs.component.html',
  styleUrls: ['./issue-logs.component.scss']
})
export class IssueLogsComponent implements OnInit {
  protected table: any;
  protected columns: Array<any> = [
    { title: 'Статус', data: 'issue.state.transName', defaultContent: '', bVisible: false },
    { title: 'Користувач', data: 'create.login', defaultContent: '' },
    { title: 'Витрати', data: 'expenses', defaultContent: '' },
    { title: 'Опис', data: 'description', defaultContent: '' },
    { title: 'Дія', data: 'actionType.name', defaultContent: '' },
    { title: 'Старий статус', data: 'oldState.transName', defaultContent: '' },
    { title: 'Новий статус', data: 'newState.transName', defaultContent: '' },
    { title: 'Постачальник', data: 'supplier.name', defaultContent: '', bVisible: false },
    { title: 'Транспорт', data: 'issue.vehicle.inventoryId', defaultContent: '' },
    { title: 'Створено', data: 'createdDate', defaultContent: '', render: data => moment(data).format('DD.MM.YYYY') },
    { title: 'Редаговано', data: 'updatedDate', defaultContent: '', bVisible: false },
    {
      orderable: false,
      title: 'Документи',
      data: 'documents',
      defaultContent: '',
      render: (data, type, row, meta) => (row.documents ? row.documents.map(x => x.name).join('; ') : '')
    },
    { data: 'id', bVisible: false }
  ];

  protected readonly tableConfig: any = {
    scrollX: true,
    select: {
      style: 'single'
    },
    columns: this.columns,
    order: [[this.columns.indexOf(this.columns.filter(x => x.data === 'updatedDate')[0]), 'desc']],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    paging: true,
    language: {
      url: 'assets/language.json'
    }
  };

  constructor(
    protected issueLogService: IssuelogService,
    protected documentsService: DocumentService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.initTable(this.tableConfig);
  }

  protected ajaxCallback(dataTablesParameters: any, callback): void {
    this.issueLogService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  protected initTable(tableConfig: any): void {
    this.table = $('#issue-logs-table').DataTable(tableConfig);
  }
}
