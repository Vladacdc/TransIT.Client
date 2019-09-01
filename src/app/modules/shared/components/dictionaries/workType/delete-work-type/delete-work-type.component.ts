import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { WorkType } from 'src/app/modules/shared/models/work-type';
import { WorkTypeService } from 'src/app/modules/shared/services/work-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-work-type-delete',
    templateUrl: './delete-work-type.component.html',
    styleUrls: ['./delete-work-type.component.scss']
  })
export class DeleteWorkTypeComponent implements OnInit {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() workType: WorkType;
  @Output() deleteWorkType = new EventEmitter<WorkType>();

  constructor(private workTypeService: WorkTypeService, private toast: ToastrService) {}

  ngOnInit() {}

  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.workTypeService.deleteEntity(this.workType.id).subscribe(
      data => {
        this.toast.success('', 'Тип роботи видалено');
        this.deleteWorkType.next(this.workType);
      },
      error => this.toast.error('Помилка видалення')
    );
  }
}
