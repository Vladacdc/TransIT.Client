import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Document } from '../../../models/document';
import { DocumentService } from '../../../services/document.service';
import * as moment from 'moment';

declare const $;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documents: Document[] = [];
  tableDocument: DataTables.Api;
  selectedDocument: Document;
  tost: ToastrService;
  @Input() isVisible: boolean;

  constructor(private documentService: DocumentService, private router: Router, private toast: ToastrService) {}
  _url = this.router.url.substring(1, this.router.url.length - 1);

  ngOnInit() {
    this._url = this._url.substring(0, this._url.indexOf('/'));
    this.tableDocument = $('#document-table').DataTable({
      responsive: true,
      columns: [
        { title: 'Назва', data: 'name', defaultContent: '' },
        { title: 'Опис', data: 'description', defaultContent: '' },
        {
          title: 'Дата створення',
          data: 'newDate',
          defaultContent: '',
          render: function(data) {
            return moment(data).format('DD.MM.YYYY');
          }
        },
        {
          title: 'Змінено',
          data: 'modDate',
          defaultContent: '',
          render: function(data) {
            return moment(data).format('DD.MM.YYYY');
          }
        },
        { data: 'id', visible: false },
        { title: 'Дії⠀', orderable: false, visible: this.isVisible }
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
           <button class="third btn" data-toggle="modal"><i class="fas fa-info-circle"></i></button>
           <button class="five btn"><i class="fas fa-file-download"></i></button>`
        }
        // <button class="fourth btn btn-info">Шлях</button>
      ],
      paging: true,
      scrollX: true,
      language: {
        url: 'assets/language.json'
      }
    });
    $('#document-table tbody').on('click', '.first', this.selectFirstItem(this));
    $('#document-table tbody').on('click', '.second', this.selectSecondItem(this));
    $('#document-table tbody').on('click', '.third', this.selectThirdItem(this));
    $('#document-table tbody').on('click', '.fourth', this.copyMessage(this));
    $('#document-table tbody').on('click', '.five', event => {
      const data = this.tableDocument.row($(event.currentTarget).parents('tr')).data() as Document;
      this.documentService.downloadFile(data);
    });
  }

  private ajaxCallback(dataTablesParameters: any, callback): void {
    this.documentService.getFilteredEntities(dataTablesParameters).subscribe(x => {
      if (x.recordsTotal < 11) {
        $('#document-table_wrapper')
          .find('.dataTables_paginate')
          .hide();

        $('#document-table_wrapper')
          .find('.dataTables_length')
          .hide();
      }
      callback(x);
    });
  }

  selectFirstItem(component: any) {
    return function() {
      const data = component.tableDocument.row($(this).parents('tr')).data();
      component.selectedDocument = new Document({ ...data });
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
        component.documentService.selectedItem = new Document(this.selectedDocument);
        component.router.navigate([`${component._url}/issue-log`]);
      }
    };
  }

  copyMessage(component: any) {
    return function() {
      const data = component.tableDocument.row($(this).parents('tr')).data();
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = data.path;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      component.toast.success(`шлях документа "${data.name}" скопійований`, 'Скопійовано', {
        timeOut: 3000
      });
    };
  }

  addDocument(document: Document) {
    this.documents.push(document);
    this.tableDocument.draw();
  }

  deleteDocument(document: Document) {
    this.documents = this.documents.filter(v => v.id !== document.id);
    this.tableDocument.draw();
  }

  editDocument(document: Document) {
    this.documents[this.documents.findIndex(i => i.id === document.id)] = document;
    this.tableDocument.draw();
  }
}
