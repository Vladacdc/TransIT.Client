import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Document } from 'src/app/modules/shared/models/document';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';
import { IssuelogService } from 'src/app/modules/shared/services/issuelog.service';
import { DocumentService } from 'src/app/modules/shared/services/document.service';
import { PDF_FILE_ERRORS } from 'src/app/custom-errors';
import { CustomValidators } from 'src/app/custom-validators';

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})

export class CreateDocumentComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @ViewChild('fileInput') fileInput;

  @Output() createDocument = new EventEmitter<Document>();
  @Input() issueLog;
  documentForm: FormGroup;
  issueLogList: IssueLog[];
  selectedFile = null;
  constructor(
    private serviceIssueLog: IssuelogService,
    private serviceDocument: DocumentService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  CustomPDFErrorMessages = PDF_FILE_ERRORS;

  ngOnInit() {
    $('#createDocument').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.documentForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', [Validators.required, CustomValidators.isPDF]],
      newDate: ['', Validators.required]
    });
    this.serviceIssueLog.getEntities().subscribe(issuelog => {
      this.issueLogList = issuelog;
    });
  }

  clickSubmit() {
    if (this.documentForm.invalid) {
      return;
    }
    let fi = this.fileInput.nativeElement;
    if (!fi.files && !fi.files[0]) return;
    let fileToUpload = fi.files[0];

    const form = this.documentForm.value;
    const document = {
      id: 0,
      name: form.name as string,
      description: form.description as string,
      issueLog: this.issueLog,
      path: '',
      newDate: form.newDate as Date,
      file: fileToUpload
    };
    this.serviceDocument.addDocument(document as Document).subscribe(
      newGroup => {
        this.createDocument.next(newGroup);
        this.toast.success('Документ збережено');
      },
        error => this.toast.error('Помилка створення', 'Помилка')
    );
    this.closeDiv.nativeElement.click();
  }
}
