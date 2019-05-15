import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Documents } from '../../../models/document/document';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentService } from '../../../services/document.service';
import { IssueLog } from '../../../models/issueLog/IssueLog';
import { IssueLogService } from '../../../services/issue-log.service';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createDocument = new EventEmitter<Documents>();
  documentForm: FormGroup;
  issueLogList : IssueLog[];

  constructor(private serviceIssueLog: IssueLogService, private serviceDocument: DocumentService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    $('#createDocument').on('hidden.bs.modal', function() {
      $(this).find('form').trigger('reset');
    });
    this.documentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description : ['', Validators.required],
      // issueLog: ['']
    });
    this.serviceIssueLog.getEntities().subscribe(issuelog => {
      this.issueLogList = issuelog;
    });
  }

  // get issueLogDescription(): string[] {
  //   return this.issueLogList.map(e => e.description);
  // }

  clickSubmit() {
    if (this.documentForm.invalid) {
      return;
    }
    const form = this.documentForm.value;
    const document: Documents = {
      id: 0,
      name: form.name as string,
      description : form.description as string,
      // issueLog : this.issueLogList[this.issueLogDescription.findIndex(f => f === form.issueLog)]
    };
    
    this.serviceDocument.addEntity(document).subscribe(newGroup => this.createDocument.next(newGroup));
    this.closeDiv.nativeElement.click();
  }

}
