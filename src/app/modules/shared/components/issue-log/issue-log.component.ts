import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueLog } from '../../models/issuelog';
import { Document } from '../../models/document';
import { DocumentService } from '../../services/document.service';
import { IssuelogService } from '../../services/issuelog.service';

declare const $;

@Component({
  selector: 'app-issue-log',
  templateUrl: './issue-log.component.html',
  styleUrls: ['./issue-log.component.scss']
})
export class IssueLogComponent implements OnInit {
  protected tableIssueLog: any;
  issueLog: IssueLog;
  document: Document;

  constructor(
    protected issueLogService: IssuelogService,
    protected documentService: DocumentService,
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
        { title: 'Редаговано', data: 'updatedDate', defaultContent: '' }
      ],
      paging: true,
      language: {
        url: 'assets/language.json'
      }
    });
    this.document = this.documentService.selectedItem;

    this.issueLogService.getEntity(this.document.issueLog.id).subscribe(issueLog => {
      this.issueLog = issueLog;
      this.tableIssueLog.row.add(this.issueLog);
      this.tableIssueLog.draw();
    });
  }
}
