import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-global-issue',
  templateUrl: './global-issue.component.html',
  styleUrls: ['./global-issue.component.scss']
})
export class GlobalIssueComponent implements OnInit {
  readonly priorityColors = Object.freeze(['#FFCCCC', '#FFFFCC', '#CCFFCC']);
  protected table: any;
  protected readonly tableConfig: any = {
    scrollX: true,
    select: {
      style: 'single'
    },
    columns: [
      { title: 'Номер', data: 'number', defaultContent: '' },
      { title: 'Пріоритет', data: 'priority', defaultContent: '', bVisible: false },
      { title: 'Статус', data: 'state.transName', defaultContent: '' },
      { title: 'Поломка', data: 'malfunction.name', defaultContent: '' },
      { title: 'Гарантія', data: 'warranty', defaultContent: '' },
      { title: 'Транспорт', data: 'vehicle.inventoryId', defaultContent: '' },
      { title: 'Відповідальний', data: 'assignedTo.login', defaultContent: '' },
      { title: 'Виконати до', data: 'deadline', defaultContent: '' },
      { title: 'Опис', data: 'summary', defaultContent: '' },
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
    },
    createdRow: (row, data, dataIndex) => {
      $(row).css('background-color', this.priorityColors[data.priority]);
    }
  };

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit() {
    this.initTable();
  }
  private ajaxCallback(dataTablesParameters: any, callback): void {
    //  dataTablesParameters.filters = [{entityPropertyPath: 'malfunction.name', value: ''},{}]
    this.issueService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  protected initTable(): void {
    this.table = $('#issue-table').DataTable(this.tableConfig);
  }
}
