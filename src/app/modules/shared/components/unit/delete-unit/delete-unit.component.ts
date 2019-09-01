import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Unit } from 'src/app/modules/shared/models/unit';
import { UnitService } from 'src/app/modules/shared/services/unit.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-unit',
  templateUrl: './delete-unit.component.html',
  styleUrls: ['./delete-unit.component.scss']
})
export class DeleteUnitComponent {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() unit: Unit;
  @Output() deleteUnit = new EventEmitter<Unit>();

  constructor(
      private service: UnitService,
      private toast: ToastrService,
      private translate: TranslateService) {
  }

  clickSubmit() {
    this.service.deleteEntity(this.unit.id).subscribe(
      data => {
        this.toast.success('', this.translate.instant('Core.Toasts.Deleted'));
        this.deleteUnit.next(this.unit);
      },
      error => this.toast.error(this.translate.instant('Core.Toasts.Error'))
    );
    this.close();
  }

  close() {
    this.closeDeleteModal.nativeElement.click();
  }
}
