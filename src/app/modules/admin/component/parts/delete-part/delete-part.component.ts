import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Part } from 'src/app/modules/shared/models/part';
import { PartService } from 'src/app/modules/shared/services/part.service';

@Component({
  selector: 'app-delete-part',
  templateUrl: './delete-part.component.html',
  styleUrls: ['./delete-part.component.scss']
})
export class DeletePartComponent {
  @Input() part: Part;
  @Output() deletePart = new EventEmitter<Part>();

  constructor(private partService: PartService, private toast: ToastrService) {}

  delete(): void {
    this.partService.deleteEntity(this.part.id).subscribe(
      () => {
        this.deletePart.next(this.part);
        this.toast.success('', 'Запчастину видалено');
      },
      () => this.toast.error('Не вдалось видалити запчастину', 'Помилка видалення')
    );
  }
}
