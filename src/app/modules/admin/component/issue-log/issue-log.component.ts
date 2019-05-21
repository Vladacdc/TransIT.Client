import { Component, OnInit } from '@angular/core';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';
import { DocumentService } from 'src/app/modules/shared/services/document.service';
import { Router } from '@angular/router';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { Document } from 'src/app/modules/shared/models/document';

declare const $;

@Component({
  selector: 'app-issue-log',
  templateUrl: './issue-log.component.html',
  styleUrls: ['./issue-log.component.scss']
})
export class IssueLogComponent implements OnInit {
  issueLogs: Array<IssueLog>;
  issueLog: IssueLog;
  protected tableIssueLog: any;
  document: Document;

  constructor(
    protected issueLogService: IssuelogService,
    protected DocumentService: DocumentService,
    protected router: Router
  ) {}

  ngOnInit() {
    this.tableIssueLog = $('#issue-logs-table').DataTable({
      scrollX: true,
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
    this.document = this.DocumentService.selectedItem;

    this.issueLogService.getEntity(this.document.issueLog.id).subscribe(issueLog => {
      this.issueLog = issueLog;
      this.tableIssueLog.row.add(this.issueLog);
      this.tableIssueLog.draw();
    });
  }
}
