import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Document } from 'src/app/modules/shared/models/document';
import { DocumentService } from 'src/app/modules/shared/services/document.service';

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.scss']
})
export class DeleteDocumentComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() document: Document;
  @Output() deleteDocument = new EventEmitter<Document>();

  constructor(private service: DocumentService, private toast: ToastrService) {}

  ngOnInit() {}

  DeleteDocument() {
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.document.id).subscribe(() => {
      this.deleteDocument.next(this.document);
      this.toast.success('', 'Документ видалено');
    });
  }
}
