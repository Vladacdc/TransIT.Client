import { Component, OnInit } from '@angular/core';
import {IssueLog} from '../../models/issuelog';
import {Document} from '../../models/document';
import {DocumentService} from '../../services/document.service';

declare const $;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  public selectedDocument: Document;
  public documents: Array<IssueLog>;
  protected table: any;

  constructor(protected documentService: DocumentService) {}

  public ngOnInit() {
    this.documentService.getEntities().subscribe(documents => {
      this.documents = documents;
      this.initTable();
      this.loadLogs();
    });
  }

  protected initTable(): void {
    this.table = $('#documents-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Ім\'я', data: 'name', defaultContent: '' },
        { title: 'Опис', data: 'description', defaultContent: '' },
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.table.on('select', this.selectRow);
  }

  public updateDocument(item: Document): void {
    this.documentService.updateEntity(item).subscribe();
  }

  protected loadLogs(): void {
    this.table.rows.add(this.documents);
    this.table.draw();
  }

  protected selectRow(e: any, dt: any, type: any, indexes: any): void {
    this.selectedDocument = this.table.rows( indexes ).data()[0];
  }
}
