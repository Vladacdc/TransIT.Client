import {Component, OnInit} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {Issue} from '../../models/issue';
import {State} from '../../models/state';
import {StateService} from '../../services/state.service';
import {IssuelogService} from '../../services/issuelog.service';
import {IssueLog} from '../../models/issuelog';
import {ActionTypeService} from '../../services/action-type.service';
import {ActionType} from '../../models/actionType';
import {Router} from '@angular/router';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  public issues: Array<Issue>;

  private table: any;

  constructor(
    private issueService: IssueService,
    private router: Router
  ) {}

  ngOnInit() {
    this.table = $('#issue-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Статус', data: 'state.transName' },
        { title: 'Поломка', data: 'malfunction.name' },
        { title: 'Гарантія', data: 'warranty' },
        { title: 'Транспорт', data: 'vehicle.inventoryId' },
        { title: 'Відповідальний', data: 'assignedTo.login' },
        { title: 'Виконати до', data: 'deadLine' },
        { title: 'Опис', data: 'summary' },
        { title: 'Створено', data: 'createDate' },
        { title: 'Редаговано', data: 'modDate' },
      ],
      paging: true,
      columnDefs: [
        {
          targets: [8, 9],
          orderable: false
        }
      ],
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    });
    this.issueService.getEntities().subscribe(issues => {
      this.issues = issues;
      this.table.rows.add(this.issues);
      this.table.draw();
    });
    this.table.on('select', (e, dt, type, indexes) => {
      const item = this.table.rows( indexes ).data()[0];
      this.router.navigate(['/engineer/issue-logs', item]);
    });
  }
}
