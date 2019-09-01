import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Manufacturer } from 'src/app/modules/shared/models/manufacturer';
import { ManufacturerService } from 'src/app/modules/shared/services/manufacturer.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-manufacturer',
  templateUrl: './delete-manufacturer.component.html',
  styleUrls: ['./delete-manufacturer.component.scss']
})
export class DeleteManufacturerComponent {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() manufacturer: Manufacturer;
  @Output() deleteManufacturer = new EventEmitter<Manufacturer>();

  constructor(
      private service: ManufacturerService,
      private toast: ToastrService,
      private translate: TranslateService) {
  }

  clickSubmit() {
    this.service.deleteEntity(this.manufacturer.id).subscribe(
      data => {
        this.toast.success('', this.translate.instant('Core.Toasts.Deleted'));
        this.deleteManufacturer.next(this.manufacturer);
      },
      error => this.toast.error(this.translate.instant('Core.Toasts.Error'))
    );
    this.closeDeleteModal.nativeElement.click();
  }
}
