import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Part } from 'src/app/modules/shared/models/part';
import { PartService } from 'src/app/modules/shared/services/part.service';

@Component({
  selector: 'app-delete-part',
  templateUrl: './delete-part.component.html',
  styleUrls: ['./delete-part.component.scss']
})
export class DeletePartComponent {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() part: Part;
  @Output() deletePart = new EventEmitter<Part>();

  constructor(private service: PartService, private toast: ToastrService) {}

  ngOnInit() {}
  
  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.service.deleteEntity(this.part.id).subscribe(
      data => {
        this.toast.success('', 'Запчастину видалено');
        this.deletePart.next(this.part);        
      },
      error => this.toast.error('Помилка видалення')
    );
  }
}
