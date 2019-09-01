import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { ManufacturerService } from 'src/app/modules/shared/services/manufacturer.service';
import { Manufacturer } from 'src/app/modules/shared/models/manufacturer';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-manufacturer',
  templateUrl: './create-manufacturer.component.html',
  styleUrls: ['./create-manufacturer.component.scss']
})
export class CreateManufacturerComponent implements OnInit {
  manufacturerForm: FormGroup;
  @ViewChild('close') closeCreateModal: ElementRef;
  @Output() createManufacturer = new EventEmitter<Manufacturer>();

  constructor(
    private manufacturerService: ManufacturerService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.manufacturerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(60)])),
    });
  }

  clickSubmit() {
    if (this.manufacturerForm.invalid) {
      return;
    }
    const form = this.manufacturerForm.value;
    const manufacturer: Manufacturer = {
      id: 0,
      name: form.name as string,
    };

    this.manufacturerService.addEntity(manufacturer).subscribe(newGroup => {
      this.createManufacturer.next(newGroup);
      this.toast.success('', this.translate.instant('Core.Toasts.Created'));
    },
    error => {
      this.toast.error('', this.translate.instant('Core.Toasts.Error'));
    });
    this.close();
  }

  close() {
    this.closeCreateModal.nativeElement.click();
  }
}
