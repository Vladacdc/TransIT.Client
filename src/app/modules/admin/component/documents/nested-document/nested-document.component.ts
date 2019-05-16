import { Component, OnInit, Input } from '@angular/core';
import { Documents } from '../../../models/document/document';

import { DocumentService } from '../../../services/document.service';

declare const $;

@Component({
  selector: 'app-nested-document',
  templateUrl: './nested-document.component.html',
  styleUrls: ['./nested-document.component.scss']
})
export class NestedDocumentComponent implements OnInit {
  private tableNestedDoc: DataTables.Api;
  protected tableIssueLog: any;
  public chosenDocument: Documents;
  @Input()
  set document(document: Documents) {
    this.chosenDocument = document;
    console.dir(document);
  }

  constructor(private nestedDocument: DocumentService) {}

  ngOnInit() {
    // this.tableNestedDoc = $('#nested-document-table').DataTable({
    //   responsive: true,
    //   select: {
    //     style: 'single'
    //   },
    //   columns: [
    //     { data: 'id', bVisible: false },
    //     { title: 'Назва', data: 'name', defaultContent: '' },
    //     { title: 'Опис', data: 'description', defaultContent: '' },
    //     { title: 'Змінено', data: 'modDate', defaultContent: '' }
    //   ],
    //   paging: true,
    //   language: {
    //     url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    //   }
    // });
    // this.nestedDocument.getEntity(this.chosenDocument.id).subscribe(document => {
    //   this.chosenDocument = document;
    //   this.tableNestedDoc.row.add(this.chosenDocument);
    //   this.tableNestedDoc.draw();
    // });
  }
}
