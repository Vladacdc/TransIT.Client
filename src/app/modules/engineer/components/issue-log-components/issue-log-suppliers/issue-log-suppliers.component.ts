import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Supplier } from 'src/app/modules/shared/models/supplier';
import { SupplierService } from 'src/app/modules/shared/services/supplier.service';

declare const $;

@Component({
  selector: 'app-issue-log-suppliers',
  templateUrl: './issue-log-suppliers.component.html',
  styleUrls: ['./issue-log-suppliers.component.scss']
})
export class IssueLogSuppliersComponent implements OnInit {
  currentSupplier: Supplier;
  suppliers: Array<Supplier>;
  @Output() selectSupplier: EventEmitter<Supplier>;

  constructor(private supplierService: SupplierService) {
    this.selectSupplier = new EventEmitter<Supplier>();
  }

  ngOnInit() {
    this.supplierService.getEntities().subscribe(items => (this.suppliers = items));
  }

  selectItem(item: Supplier): void {
    this.currentSupplier = item;
    this.selectSupplier.emit(item);
  }
}
