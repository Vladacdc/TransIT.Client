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
    this.vehicleTypeForm.patchValue({ ...vehicleType });
  }
  @Output() updateVehicleType = new EventEmitter<VehicleType>();

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
    console.log(vehicleType);
    this.serviceVehicleType
      .updateEntity(vehicleType)
      .subscribe(
        data => this.updateVehicleType.next(vehicleType),
        _ => this.toast.error('Не вдалось редагувати дані про тип транспорту', 'Помилка редагування даних')
      );
  }
}
