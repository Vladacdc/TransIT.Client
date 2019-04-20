import {Component, OnInit} from '@angular/core';
import {IssuelogService} from '../../services/issuelog.service';
import {IssueLog} from '../../models/issuelog';
import {Router} from '@angular/router';

declare const $;

@Component({
  selector: 'app-issue-logs',
  templateUrl: './issue-logs.component.html',
  styleUrls: ['./issue-logs.component.scss']
})
export class IssueLogsComponent implements OnInit {

  public issueLogs: Array<IssueLog>;
  protected table: any;

  constructor(
    protected issueLogService: IssuelogService,
    protected router: Router
  ) {}

  public ngOnInit() {
    this.initTable();
    this.issueLogService.getEntities().subscribe(this.loadLogs);
  }

  protected initTable(): void {
    this.table = $('#issue-logs-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Статус', data: 'issue.state.transName' },
        { title: 'Творець', data: 'create.login' },
        { title: 'Витрати', data: 'expenses' },
        { title: 'Опис', data: 'description' },
        { title: 'Дія', data: 'actionType.name' },
        { title: 'Старий статус', data: 'oldState.transName' },
        { title: 'Новий статус', data: 'newState.transName' },
        { title: 'Постачальник', data: 'supplier.name' },
        { title: 'Транспорт', data: 'issue.vehicle.inventoryId' },
        { title: 'Створено', data: 'createDate' },
        { title: 'Редаговано', data: 'modDate' },
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.table.on('select', this.selectRow);
  }

  protected loadLogs(logs: Array<IssueLog>): void {
    this.issueLogs = logs;
    this.table.rows.add(this.issueLogs);
    this.table.draw();
  }

  protected selectRow(e: any, dt: any, type: any, indexes: any): void {
    const item = this.table.rows( indexes ).data()[0];
    this.router.navigate(['/engineer/issue-logs/edit', item]);
  }
}
