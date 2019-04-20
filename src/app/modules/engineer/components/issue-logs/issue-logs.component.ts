import {Component, OnInit, Input, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IssuelogService} from '../../services/issuelog.service';
import {IssueLog} from '../../models/issuelog';
import {ActionType} from '../../models/actionType';
import {ActivatedRoute, Router} from '@angular/router';

declare const $;

@Component({
  selector: 'app-issue-logs',
  templateUrl: './issue-logs.component.html',
  styleUrls: ['./issue-logs.component.scss']
})
export class IssueLogsComponent implements OnInit {

  public issueLogs: Array<IssueLog>;
  private table: any;

  constructor(
    private issueLogService: IssuelogService,
    private router: Router
  ) {}

  ngOnInit() {
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
    this.table.on('select', (e, dt, type, indexes) => {
      const item = this.table.rows( indexes ).data()[0];
      this.router.navigate(['/engineer/issue-logs/edit', item]);
    });
    // this.activatedRoute.params.subscribe(params => {
    this.issueLogService.getEntities().subscribe(logs => {
      this.issueLogs = logs;
      this.table.rows.add(this.issueLogs);
      this.table.draw();
      // const issueId = params.id;
      // if (issueId) {
      //   this.issueLogService.getEntitiesByIssueId(issueId).subscribe(logs => {
      //     this.issueLogs = logs;
      //   });
      // } else {
      //   });
      // }
    });
  }
}
