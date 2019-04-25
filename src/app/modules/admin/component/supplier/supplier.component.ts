import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/modules/engineer/models/supplier';
import { SupplierService } from 'src/app/modules/engineer/services/supplier.service';

declare const $;

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  
  public suppliers: Array<Supplier>;
  private table: any;
  public supplier: Supplier;

  constructor(
    private supplierSevice: SupplierService
  ) {}

  ngOnInit() {
    this.table = $('#supplier-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { 
          title: "Ім'я", 
          defaultContent: ''
        },
        {
          title: 'Видалити',
          orderable: false,
          defaultContent: ''
        }
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.supplierSevice.getEntities().subscribe(
      suppliers => {
      this.suppliers = suppliers;
      this.table.rows.add(this.suppliers);
      this.table.draw();
      this.addTableData(suppliers);      
    });
  }

  addItem(supplier: Supplier) {
      this.suppliers = [...this.suppliers, supplier];
      const view = [
        supplier.name,
        `<button id="find-supplier-${
          supplier.id
        }" class="btn" data-toggle="modal" data-target="#deleteSupplierModal"><i class="fas fa-trash-alt" style="color: darkred"></i></button>`
      ];
  
      this.table.row.add(view)
        .draw();
  
      $('button[id^="find-supplier"]')
        .off('click')
        .on('click', event => {
          const idTokens = event.currentTarget.id.split('-');
          const id = parseInt(idTokens[idTokens.length - 1], 10);
          this.supplier = this.suppliers.find(i => i.id === id);
        });
    }

  addTableData(newSuppliers: Supplier[]) {
    this.suppliers = [...newSuppliers, ...this.suppliers];
    const view = newSuppliers.map(i => [
      i.name,
      `<button id="find-supplier-${
        i.id
      }" class="btn" data-toggle="modal" data-target="#deleteSupplierModal"><i class="fas fa-trash-alt" style="color: darkred"></i></button>`
    ]);

    this.table = $('#supplier-table')
      .dataTable()
      .api()
      .clear()
      .rows.add(view)
      .draw();

    $('button[id^="find-supplier"]')
      .off('click')
      .on('click', event => {
        const idTokens = event.currentTarget.id.split('-');
        const id = parseInt(idTokens[idTokens.length - 1], 10);
        this.supplier = this.suppliers.find(i => i.id === id);
        
      });
  }
}
