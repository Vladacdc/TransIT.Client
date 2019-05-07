import { Component, OnInit } from '@angular/core';
import { IssuelogService } from '../../services/issuelog.service';
import { IssueLog } from '../../models/issuelog';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

declare const $;

@Component({
  selector: 'app-issue-logs',
  templateUrl: './issue-logs.component.html',
  styleUrls: ['./issue-logs.component.scss']
})
export class IssueLogsComponent implements OnInit {
  issueLogs: Array<IssueLog>;
  protected table: any;

  constructor(
    protected issueLogService: IssuelogService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.initTable();
  }

  protected initTable(): void {
    this.table = $('#issue-logs-table').DataTable({
      responsive: true,
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
      ajax: {
        url: environment.apiUrl + '/datatable/issuelog',
        type: 'POST'
      },
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.table.on('select', this.selectRow);
  }

  protected selectRow(e: any, dt: any, type: any, indexes: any): void {
    const item = this.table.rows(indexes).data()[0];
    this.router.navigate(['/engineer/issue-logs/edit', item]);
  }
}
