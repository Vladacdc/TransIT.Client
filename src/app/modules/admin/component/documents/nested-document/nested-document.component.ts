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
  }

  constructor() {}

  ngOnInit() {
  }
}
