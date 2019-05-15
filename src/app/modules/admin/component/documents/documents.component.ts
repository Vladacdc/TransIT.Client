import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Documents } from '../../models/document/document';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare const $;

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  documents: Documents[] = [];
  tableDocument: DataTables.Api;
  selectedDocument: Documents;

  constructor(private documentService: DocumentService, private router: Router, private toast: ToastrService) {}

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,

    columns: [{ title: 'Назва' }, { title: 'Опис' }, { title: 'Змінено' }, { title: 'Дії⠀', orderable: false }],
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.tableDocument = $('#document-table').DataTable(this.tableConfig);
    this.documentService.getEntities().subscribe(decuments => {
      this.addTableData(decuments);
    });
  }

  addTableData(newDocument: Documents[]) {
    this.documents = [...newDocument];
    const view = newDocument.map(document => this.vehicleToRow(document));
    this.tableDocument.clear();
    this.tableDocument.rows.add(view).draw();

    $('#document-table tbody')
      .off('click')
      .on('click', 'button[id^="document"]', event => {
        const idTokens = event.currentTarget.id.split('-');
        const id = parseInt(idTokens[idTokens.length - 1], 10);
        console.log(id);
        this.selectedDocument = new Documents(this.documents.find(i => i.id === id));
        console.dir(this.selectedDocument);
        console.dir(this.selectedDocument.issueLog);
      })
      .on('click', 'button[id^="issueLog"]', event => {
        const idTokens = event.currentTarget.id.split('-');
        const id = parseInt(idTokens[idTokens.length - 1], 10);
        console.log(id);
        this.selectedDocument = this.documents.find(i => i.id === id);
        if (!this.selectedDocument.issueLog) {
          this.toast.error('У даного документа відсутня історія заявок', 'Помилка', {
            timeOut: 2500
          });
        }
        if (this.selectedDocument.issueLog) {
          this.documentService.selectedDocument = new Documents(this.selectedDocument);
          this.router.navigate(['/admin/issue-log']);
        }
      });
  }

  // private ajaxCallback(dataTablesParameters: any, callback): void {
  //   this.documentService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  // }

  vehicleToRow(document: Documents): any[] {
    return [
      document.name,
      document.description,
      document.modDate,
      `<button id="document-${
        document.id
      }" class="btn" data-toggle="modal" data-target="#editDocument"><i class="fas fa-edit"></i></button>
       <button id="document-${
         document.id
       }" class="btn" data-toggle="modal" data-target="#deleteDocument"><i class="fas fas fa-trash-alt"></i></button>
       <button id="issueLog-${document.id}" class="btn" data-toggle="modal"><i class="fas fa-info-circle"></i></button>`
    ];
  }

  addDocument(document: Documents) {
    this.documents.push(document);
    this.tableDocument.row.add(this.vehicleToRow(document)).draw();
  }

  deleteDocument(document: Documents) {
    this.documents = this.documents.filter(v => v.id !== document.id);
    this.tableDocument
      .rows($(`button[id^="document-${document.id}"]`).parents('tr'))
      .remove()
      .draw(false);
  }

  editDocument(document: Documents) {
    this.documents[this.documents.findIndex(i => i.id === document.id)] = document;
    this.documentService.getEntities().subscribe(vehicles => {
      this.addTableData(vehicles);
    });
  }
}
