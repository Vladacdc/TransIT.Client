import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/modules/engineer/models/supplier';
import { SupplierService } from 'src/app/modules/engineer/services/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  [x: string]: any;
  @Output() public createSupplier: EventEmitter<Supplier>; 
  @ViewChild ('close') modalClose;
  public supplierForm: FormGroup;
  public supplier: Supplier;

  constructor(private activatedRoute: ActivatedRoute, private supplierService: SupplierService) {
    this.createSupplier = new EventEmitter<Supplier>();
    this.supplierForm = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(100)])
      ),
      description: new FormControl('', Validators.maxLength(512))
    });
  }

  private newSupplier(): Supplier {
    return new Supplier({ name: ''});
  }

  ngOnInit() {
    this.supplier = this.newSupplier();
    this.activatedRoute.params.subscribe(res => {
      this.supplier = new Supplier(res);
    });
    $('#createSupplier').on('hidden.bs.modal', () => {
      $(this)
        .find('form')
        .trigger('reset');
    });
  }

  public onSubmit(): void {      
    if (this.supplierForm.invalid) {
      alert('Invalid');
      return;
    }
    const form = this.supplierForm.value;
    const supplier: Supplier = {
      id: 0,
      name: form.name as string,
      };
      
      this.supplierService
      .addEntity(supplier)
      .subscribe(
        newSupplier => {
          this.modalClose.nativeElement.click();
          this.createSupplier.next(newSupplier)},
        error => this.toast.error('Помилка', 'Постачальник з таким іменем існує')
      );
  }
}
