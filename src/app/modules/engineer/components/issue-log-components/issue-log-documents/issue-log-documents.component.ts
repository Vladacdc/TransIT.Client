import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../../../models/document';
import { DocumentService } from '../../../services/document.service';

@Component({
  selector: 'app-issue-log-documents',
  templateUrl: './issue-log-documents.component.html',
  styleUrls: ['./issue-log-documents.component.scss']
})
export class IssueLogDocumentsComponent implements OnInit {

  currentDocument: Document;
  documents: Array<Document>;
  @Output() selectDocument: EventEmitter<Document>;

  constructor(private documentService: DocumentService) {
    this.selectDocument = new EventEmitter<Document>();
  }

  ngOnInit() {
    this.documentService.getEntities().subscribe(items => this.documents = items);
  }

  selectItem(item: Document): void {
    this.currentDocument = item;
    this.selectDocument.emit(item);
  }
}
