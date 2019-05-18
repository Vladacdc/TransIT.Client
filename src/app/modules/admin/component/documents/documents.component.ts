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
  tost: ToastrService;

  constructor(private documentService: DocumentService, private router: Router, private toast: ToastrService) {}

  private readonly tableConfig: DataTables.Settings = {
    responsive: true,

    columns: [
      { title: 'Назва', data: 'name', defaultContent: '' },
      { title: 'Опис', data: 'description', defaultContent: '' },
      { title: 'Змінено', data: 'modDate', defaultContent: '' },
      { data: 'id', visible: false },
      { title: 'Дії⠀', orderable: false }
    ],
    processing: true,
    serverSide: true,
    ajax: this.ajaxCallback.bind(this),
    columnDefs: [
      {
        targets: -1,
        data: null,
        defaultContent: `<button class="first btn" data-toggle="modal" data-target="#editDocument"><i class="fas fa-edit"></i></button>
         <button class="second btn" data-toggle="modal" data-target="#deleteDocument"><i class="fas fas fa-trash-alt"></i></button>
         <button class="third btn" data-toggle="modal"><i class="fas fa-info-circle"></i></button>`
      }
    ],
    paging: true,
    scrollX: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    }
  };

  ngOnInit() {
    this.tableDocument = $('#document-table').DataTable(this.tableConfig);
    $('#document-table tbody').on('click', '.first', this.selectFirstItem(this));
    $('#document-table tbody').on('click', '.second', this.selectSecondItem(this));
    $('#document-table tbody').on('click', '.third', this.selectThirdItem(this));
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.documentService.getFilteredEntities(dataTablesParameters).subscribe(callback);
  }

  selectFirstItem(component: any) {
    return function() {
      const data = component.tableDocument.row($(this).parents('tr')).data();
      component.selectedDocument = data;
    };
  }

  selectSecondItem(component: any) {
    return function() {
      const data = component.tableDocument.row($(this).parents('tr')).data();
      component.selectedDocument = data;
    };
  }

  selectThirdItem(component: any) {
    return function() {
      const data = component.tableDocument.row($(this).parents('tr')).data();
      this.selectedDocument = data;


      if (!this.selectedDocument.issueLog) {
        component.toast.error('У даного документа відсутня історія заявок', 'Помилка', {
          timeOut: 2500
        });
      }
      if (this.selectedDocument.issueLog) {
        component.documentService.selectedItem = new Documents(this.selectedDocument);
        component.router.navigate(['/admin/issue-log']);
      }
    };
  }

  addDocument(document: Documents) {
    this.documents.push(document);
    this.tableDocument.draw();
  }

  deleteDocument(document: Documents) {
    this.documents = this.documents.filter(v => v.id !== document.id);
    this.tableDocument.draw();
  }

  editDocument(document: Documents) {
    this.documents[this.documents.findIndex(i => i.id === document.id)] = document;
    this.tableDocument.draw();
  }
}
