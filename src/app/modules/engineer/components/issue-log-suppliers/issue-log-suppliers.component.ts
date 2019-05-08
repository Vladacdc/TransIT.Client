import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { Supplier } from '../../models/supplier';
import { SupplierService } from '../../services/supplier.service';

declare const $;

@Component({
  selector: 'app-issue-log-suppliers',
  templateUrl: './issue-log-suppliers.component.html',
  styleUrls: ['./issue-log-suppliers.component.scss']
})
export class IssueLogSuppliersComponent implements OnInit {
  searchString: string;
  currentSupplier: Supplier;
  suppliers: Array<Supplier>;
  private allSuppliers: Array<Supplier>;
  @Output() selectSupplier: EventEmitter<Supplier>;
  private table: any;

  constructor(private supplierService: SupplierService) {
    this.selectSupplier = new EventEmitter<Supplier>();
  }

  ngOnInit() {
    this.table = $('#assignee-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Назва', data: 'name', defaultContent: '' },
        { title: 'Створив', data: 'create.login', defaultContent: '' },
        { title: 'Створено', data: 'createDate', defaultContent: '' },
        { title: 'Редаговано', data: 'modDate', defaultContent: '' }
      ],
      paging: true,
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
    });
    this.table.on('select', (e, dt, type, indexes) => {
      const item = this.table.rows(indexes).data()[0];
      this.selectSupplier.emit(item);
      $('#close-btn').trigger('click');
    });
    this.supplierService.getEntities().subscribe(users => {
      this.suppliers = users;
      this.allSuppliers = this.suppliers.slice();
      this.table.rows.add(this.suppliers);
      this.table.draw();
    });
  }

  onSearchChange(): void {
    const search = this.searchString.toLowerCase();
    this.suppliers = this.allSuppliers.filter(x => x.name.toLowerCase().includes(search));
    if (this.suppliers.length) {
      $('#dropdown-supplier').addClass('show');
    } else {
      $('#dropdown-supplier').removeClass('show');
    }
  }

  selectItem(item: User): void {
    this.currentSupplier = item;
    this.selectSupplier.emit(item);
    this.searchString = item.login + ' ' + item.firstName + ' ' + item.lastName + ' ';
    $('#dropdown-supplier').removeClass('show');
  }
}
