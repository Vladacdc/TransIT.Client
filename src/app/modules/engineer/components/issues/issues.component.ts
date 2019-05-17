import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';
import { priorityColors } from '../../../shared/declarations';
import { saveToStorage } from '../../services/serviceTools';

declare const $;

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  protected table: any;
  protected readonly tableConfig: any = {
    scrollX: true,
    select: {
      style: 'single'
    },
    columns: [
      { title: 'Статус', data: 'state.transName', defaultContent: '' },
      { title: 'Поломка', data: 'malfunction.name', defaultContent: '' },
      { title: 'Пріоритет', data: 'priority', defaultContent: '', bVisible: false },
      { title: 'Гарантія', data: 'warranty', defaultContent: '' },
      { title: 'Транспорт', data: 'vehicle.inventoryId', defaultContent: '' },
      { title: 'Відповідальний', data: 'assignedTo.login', defaultContent: '' },
      { title: 'Виконати до', data: 'deadline', defaultContent: '' },
      { title: 'Опис', data: 'summary', defaultContent: '' },
      { title: 'Створено', data: 'createDate', defaultContent: '', bVisible: false },
      { title: 'Редаговано', data: 'modDate', defaultContent: '' },
      { data: 'id', bVisible: false },
      {
        title: 'Кнопка',
        data: null,
        defaultContent: '<input type="button" class="btn btn-primary" value="Вибрати">'
      },
    ],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    paging: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    },
    createdRow: this.createRow
  };

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit() {
    this.initTable();
    $('#issue-table tbody').on('click', 'input', this.selectItem(this));
  }

  protected createRow(row: any, data: any, dataIndex: any) {
    $(row).css('background-color', priorityColors[data.priority]);
  }

  protected selectItem(component: any) {
    return function() {
      component.issueService.selectedItem = component.table.row($(this).parents('tr')).data();
      component.router.navigate(['/engineer/issues/edit']);
    };
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.issueService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  protected initTable(): void {
    this.table = $('#issue-table').DataTable(this.tableConfig);
  }
}
