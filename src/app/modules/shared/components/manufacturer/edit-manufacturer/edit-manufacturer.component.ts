import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Manufacturer } from '../../../models/manufacturer';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManufacturerService } from '../../../services/manufacturer.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.scss']
})
export class EditManufacturerComponent implements OnInit {
  selectedManufacturer: Manufacturer;
  manufacturerForm: FormGroup;

  @ViewChild('close') closeDiv: ElementRef;
  @Output() updateManufacturer = new EventEmitter<Manufacturer>();
  @Input()
  set manufacturer(manufacturer: Manufacturer) {
    if (!manufacturer) {
      return;
    }
    this.selectedManufacturer = new Manufacturer(manufacturer);
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: ManufacturerService,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.manufacturerForm = this.formBuilder.group({
      id: [''],
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
    });
    this.manufacturerForm.patchValue(this.selectedManufacturer);
  }

  updateData() {
    if (this.manufacturerForm.invalid) {
      return;
    }
    const form = this.manufacturerForm.value;
    const manufacturer: Manufacturer = {
      id: form.id as number,
      name: form.name as string,
    };

    this.service.updateEntity(manufacturer).subscribe(
      _ => {
        this.toast.success('', this.translate.instant('Core.Toasts.Updated'));
        this.updateManufacturer.next(manufacturer);
      },
      error => this.toast.error(this.translate.instant('Core.Toasts.Error'))
    );
    this.closeDiv.nativeElement.click();
  }

  resetForm() {
    this.manufacturerForm.patchValue(this.selectedManufacturer);
  }
}
