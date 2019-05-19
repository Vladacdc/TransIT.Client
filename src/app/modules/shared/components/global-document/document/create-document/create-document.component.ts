import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Documents } from 'src/app/modules/admin/models/document/document';
import { IssueLog } from 'src/app/modules/admin/models/issueLog/IssueLog';
import { IssueLogService } from 'src/app/modules/admin/services/issue-log.service';
import { DocumentService } from 'src/app/modules/admin/services/document.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createDocument = new EventEmitter<Documents>();
  @Input() issueLog;
  documentForm: FormGroup;
  issueLogList: IssueLog[];

  constructor(
    private serviceIssueLog: IssueLogService,
    private serviceDocument: DocumentService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    $('#createDocument').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.documentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.serviceIssueLog.getEntities().subscribe(issuelog => {
      this.issueLogList = issuelog;
    });
  }
  clickSubmit() {
    if (this.documentForm.invalid) {
      return;
    }
    const form = this.documentForm.value;
    const document: Documents = {
      id: 0,
      name: form.name as string,
      description: form.description as string,
      issueLog: this.issueLog
    };

    this.serviceDocument.addEntity(document).subscribe(newGroup => this.createDocument.next(newGroup));
    this.closeDiv.nativeElement.click();
    this.toast.success('', 'Документ створено');
  }
}
