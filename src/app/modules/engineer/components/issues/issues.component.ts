import {Component, OnInit} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {Issue} from '../../models/issue';
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
        { title: 'Статус', data: 'state.transName', defaultContent: '' },
        { title: 'Поломка', data: 'malfunction.name', defaultContent: '' },
        { title: 'Гарантія', data: 'warranty', defaultContent: '' },
        { title: 'Транспорт', data: 'vehicle.inventoryId', defaultContent: '' },
        { title: 'Відповідальний', data: 'assignedTo.login', defaultContent: '' },
        { title: 'Виконати до', data: 'deadLine', defaultContent: '' },
        { title: 'Опис', data: 'summary', defaultContent: '' },
        { title: 'Створено', data: 'createDate', defaultContent: '' },
        { title: 'Редаговано', data: 'modDate', defaultContent: '' },
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.table.on('select', (e, dt, type, indexes) => {
      const item = this.table.rows( indexes ).data()[0];
      this.router.navigate(['/engineer/issues/edit', item]);
    });
    this.issueService.getEntities().subscribe(issues => {
      this.issues = issues;
      this.table.rows.add(this.issues);
      this.table.draw();
    });
  }
}
