import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Documents } from 'src/app/modules/admin/models/document/document';
import { DocumentService } from 'src/app/modules/admin/services/document.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-document',
  templateUrl: './delete-document.component.html',
  styleUrls: ['./delete-document.component.scss']
})
export class DeleteDocumentComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() document: Documents;
  @Output() deleteDocument = new EventEmitter<Documents>();

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
