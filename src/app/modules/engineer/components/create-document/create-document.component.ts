import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Document } from '../../models/document';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IssueLog } from '../../models/issuelog';
import { ActivatedRoute } from '@angular/router';

declare const $;

@Component({
  selector: 'app-create-document',
  templateUrl: './create-document.component.html',
  styleUrls: ['./create-document.component.scss']
})
export class CreateDocumentComponent implements OnInit {
  @Output() public createDocument: EventEmitter<Document>;
  @Input() public issueLog: IssueLog;
  public documentForm: FormGroup;
  public document: Document;

  constructor(private activatedRoute: ActivatedRoute) {
    this.createDocument = new EventEmitter<Document>();
    this.documentForm = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])
      ),
      description: new FormControl('', Validators.maxLength(512))
    });
  }

  private newDocument(): Document {
    return new Document({
      name: '',
      description: '',
      issueLog: this.issueLog
    });
  }

  ngOnInit() {
    this.document = this.newDocument();
    this.activatedRoute.params.subscribe(res => {
      this.document = new Document(res);
    });
    $('#createDoc').on('hidden.bs.modal', () => {
      $(this)
        .find('form')
        .trigger('reset');
    });
  }

  public onSubmit(): void {
    if (this.documentForm.invalid) {
      alert('Invalid');
      return;
    }

    this.createDocument.emit(
      new Document({
        id: 0,
        name: this.documentForm.value.name,
        description: this.documentForm.value.description,
        issueLog: this.issueLog
      })
    );
    $('#close-btn').trigger('click');
    this.documentForm.reset();
    this.document = this.newDocument();
  }
}
