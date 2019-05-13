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
  protected table: any;
  protected readonly tableConfig: any = {
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
      ajax: this.ajaxCallback.bind(this),
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    };

  constructor(
    protected issueLogService: IssuelogService,
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
    this.table.on('select', this.selectRow.bind(this));
  }

  protected selectRow(e: any, dt: any, type: any, indexes: any): void {
    const item = this.table.rows(indexes).data()[0];
    this.router.navigate(['/engineer/issue-logs/edit', item]);
  }
}
