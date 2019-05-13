import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare const $;

@Component({
  selector: 'app-global-issue',
  templateUrl: './global-issue.component.html',
  styleUrls: ['./global-issue.component.scss']
})
export class GlobalIssueComponent implements OnInit {
  public issues: Array<Issue>;
  private table: any;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit() {
    this.initTable();
  }

  protected initTable(): void {
    this.table = $('#issue-table').DataTable({
      scrollX: true,
      select: {
        style: 'single'
      },
      columns: [
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
      ajax: {
        url: environment.apiUrl + '/datatable/issue',
        type: 'POST'
      },
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });    
  }  
}
