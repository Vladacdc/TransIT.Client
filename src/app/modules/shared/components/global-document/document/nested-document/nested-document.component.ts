import { Component, Input } from '@angular/core';
import { Document } from 'src/app/modules/shared/models/document';

declare const $;

@Component({
  selector: 'app-nested-document',
  templateUrl: './nested-document.component.html',
  styleUrls: ['./nested-document.component.scss']
})
export class NestedDocumentComponent {
  protected tableIssueLog: any;
  chosenDocument: Document;

  @Input()
  set document(document: Document) {
    this.chosenDocument = document;
  }
}
