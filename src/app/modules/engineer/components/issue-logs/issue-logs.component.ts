import { Component, OnInit } from '@angular/core';
import { IssuelogService } from '../../services/issuelog.service';
import { IssueLog } from '../../models/issuelog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

declare const $;

@Component({
  selector: 'app-issue-logs',
  templateUrl: './issue-logs.component.html',
  styleUrls: ['./issue-logs.component.scss']
})
export class IssueLogsComponent implements OnInit {
  public issueLogs: Array<IssueLog>;
  protected table: any;

  constructor(protected issueLogService: IssuelogService, protected router: Router) {}

  public ngOnInit() {
    this.issueLogService.getEntities().subscribe(logs => {
      this.initTable();
      this.issueLogs = logs;
      this.loadLogs();
    });
  }

  protected initTable(): void {
    this.table = $('#issue-logs-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
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
        { title: 'Редаговано', data: 'modDate', defaultContent: '' }
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.table.on('select', this.selectRow);
  }

  protected loadLogs(): void {
    this.table.rows.add(this.issueLogs);
    this.table.draw();
  }

  protected selectRow(e: any, dt: any, type: any, indexes: any): void {
    const item = this.table.rows(indexes).data()[0];
    this.router.navigate(['/engineer/issue-logs/edit', item]);
  }
}
