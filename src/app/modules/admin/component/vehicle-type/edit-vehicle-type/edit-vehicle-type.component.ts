import { Component, OnInit, EventEmitter, ElementRef, Input, ViewChild, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';

@Component({
  selector: 'app-edit-vehicle-type',
  templateUrl: './edit-vehicle-type.component.html',
  styleUrls: ['./edit-vehicle-type.component.scss']
})
export class EditVehicleTypeComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set vehicleType(vehicleType: VehicleType) {
    if (!vehicleType) {
      return;
    }
    this.selectedVehicleType = new VehicleType(vehicleType);
    if (this.vehicleTypeForm) {
      this.resetForm(); 
    }
  }

  
  @Output() editVehicleType = new EventEmitter<VehicleType>();

  selectedVehicleType: VehicleType;
  vehicleTypeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceVehicleType: VehicleTypeService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.vehicleTypeForm = this.formBuilder.group({
      id: '',
      name: ''
    });
    this.resetForm();
  }
  
  updateData() {
    if (this.vehicleTypeForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.vehicleTypeForm.value;
    const vehicleType: VehicleType = {
      id: form.id as number,
      name: form.name as string
    };
    this.serviceVehicleType
      .updateEntity(vehicleType)
      .subscribe(
        _ => {
          this.editVehicleType.next(vehicleType);
        },
        _ => this.toast.error('Не вдалось редагувати дані про тип транспорту', 'Помилка редагування даних')
      );
  }

  resetForm() { 
    this.vehicleTypeForm.patchValue(this.selectedVehicleType);
  }
}
