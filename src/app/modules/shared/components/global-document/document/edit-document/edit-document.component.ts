import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Document } from 'src/app/modules/shared/models/document';
import { DocumentService } from 'src/app/modules/shared/services/document.service';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {
  selectedDoc: Document;
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set document(document: Document) {
    if (!document) {
      return;
    }
    this.selectedDoc = document;
    document = new Document(document);
    this.documentFrom.patchValue(document);
  }
  @Output() editDocument = new EventEmitter<Document>();

  documentFrom: FormGroup;

  issueLogs: IssueLog[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private serviceDocument: DocumentService,
    private serviceIssueLog: IssuelogService
  ) {}

  ngOnInit() {
    this.documentFrom = this.formBuilder.group({
      id: '',
      name: '',
      description: '',
      issueLog: '',
      path: ''
    });
    this.serviceIssueLog.getEntities().subscribe(issueLogs => {
      this.issueLogs = issueLogs;
    });
  }

  updateData() {
    if (this.documentFrom.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.documentFrom.value;
    // const document = new Document(this.documentFrom.value);

    const document: Document = new Document({
      id: form.id as number,
      name: form.name as string,
      description: form.description as string,
      issueLog: this.selectedDoc.issueLog,
      path: this.selectedDoc.path
    });
    
    this.serviceDocument.updateEntity(document).subscribe(_ => this.editDocument.next(document));
    console.dir(document);
  }
}
