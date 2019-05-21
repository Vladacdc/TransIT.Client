import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';

@Component({
  selector: 'app-delete-supplier',
  templateUrl: './delete-supplier.component.html',
  styleUrls: ['./delete-supplier.component.scss']
})
export class DeleteSupplierComponent {
  @ViewChild('close') closeDeleteModal: ElementRef;
  @Input() supplier: Supplier;
  @Output() deleteSupplier = new EventEmitter<Supplier>();

  constructor(private service: SupplierService, private toast: ToastrService) {}

  delete() {
    this.closeDeleteModal.nativeElement.click();
    this.service
      .deleteEntity(this.supplier.id)
      .subscribe(
        () => this.deleteSupplier.next(this.supplier),
        () => this.toast.error('Помилка', 'Постачальник задіяний'),
        () => this.toast.success('Готово', "Об'єкт видалено")
      );
  }
}
