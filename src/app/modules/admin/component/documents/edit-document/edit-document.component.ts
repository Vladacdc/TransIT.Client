import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Documents } from '../../../models/document/document';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IssueLog } from '../../../models/issueLog/IssueLog';
import { DocumentService } from '../../../services/document.service';
import { IssueLogService } from '../../../services/issue-log.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.scss']
})
export class EditDocumentComponent implements OnInit {
  selectedDoc:Documents;
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set document(document: Documents) {
    console.dir(document);
    if (!document) {
      return;
    }
    this.selectedDoc=document;
    document = new Documents(document);
    this.documentFrom.patchValue(document);
  }
  @Output() editDocument = new EventEmitter<Documents>();

  documentFrom: FormGroup;

  issueLogs: IssueLog[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private serviceDocument: DocumentService,
    private serviceIssueLog: IssueLogService
  ) {}

  ngOnInit() {
    this.documentFrom = this.formBuilder.group({
      id: '',
      name: '',
      description: '',
      issueLog: ''
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
    // const document = new Documents(this.documentFrom.value);

    const document: Documents = {
      id: form.id as number,
      name: form.name as string,
      description: form.description as string,
      issueLog: this.selectedDoc.issueLog
    };
    console.log(document.issueLog);
    this.serviceDocument.updateEntity(document).subscribe(_ => this.editDocument.next(document));
  }
}
