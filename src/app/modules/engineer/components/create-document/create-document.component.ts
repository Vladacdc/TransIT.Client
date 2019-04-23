import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Document} from '../../models/document';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IssueLog} from '../../models/issuelog';
import {ActivatedRoute} from '@angular/router';

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
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)
      ])),
      description: new FormControl('', Validators.maxLength(512))
    });
  }

  private newDocument(): Document {
    return new Document(
      0,
      '',
      '',
      this.issueLog
    );
  }

  ngOnInit() {
    this.document = this.newDocument();
    this.activatedRoute.params.subscribe(res => {
      this.document = res;
      // this.documentForm.setValue(['name', doc.name]);
      // this.documentForm.setValue(['description', doc.description]);
    });
    $('#createDoc').on('hidden.bs.modal', () => {
      $(this).find('form').trigger('reset');
    });
  }

  public onSubmit(): void {
    if (this.documentForm.invalid) {
      alert('Invalid');
      return;
    }

    this.createDocument.emit(new Document(
      0,
      this.documentForm.value.name,
      this.documentForm.value.description,
      this.issueLog
    ));
  }
}
