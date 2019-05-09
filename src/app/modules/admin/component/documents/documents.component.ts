import { Component, OnInit } from '@angular/core';
import { Documents } from '../../models/document/document';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';
import { IssueLog } from '../../models/issueLog/IssueLog';
import { Issue } from '../../models/issue/issue';
import { Vehicle } from '../../models/vehicle/vehicle';

declare const $;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  private tableDocument: DataTables.Api;

  selectedDocument: Documents;
  Documents: Array<Documents>;
  Document: Documents;

  constructor(private documentService: DocumentService, private router: Router) {}

  ngOnInit() {
    this.tableDocument = $('#document-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: "Ім'я", data: 'name', defaultContent: '' },
        { title: 'Опис', data: 'description', defaultContent: '' },
        { title: 'Створено', data: 'createDate', defaultContent: '' },
        { title: 'Редаговано', data: 'modDate', defaultContent: '' }
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });

    this.documentService.getEntities().subscribe(Documents => {
      this.Documents = Documents;
      this.tableDocument.rows.add(this.Documents);
      this.tableDocument.draw();
    });

    this.tableDocument.on('select', (e, dt, type, index) => {
      const item = this.tableDocument.rows(index).data()[0];
      this.selectedDocument = item;
      this.router.navigate(['/admin/issue-log', this.selectedDocument.issueLog]);
    });
  }
}
