import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';

@Component({
  selector: 'app-create-vehicle-type',
  templateUrl: './create-vehicle-type.component.html',
  styleUrls: ['./create-vehicle-type.component.scss']
})
export class CreateVehicleTypeComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createVehicleType = new EventEmitter<VehicleType>();
  vehicleTypeForm: FormGroup;

  constructor(
    private serviceVehicleType: VehicleTypeService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    $('#createVehicleType').on('hidden.bs.modal', function() {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.vehicleTypeForm = this.formBuilder.group({
      name: ''
    });
  }

  clickSubmit() {
    if (this.vehicleTypeForm.invalid) {
      return;
    }

    const form = this.vehicleTypeForm.value;
    const vehicleType: VehicleType = {
      id: 0,
      name: form.name as string
    };
    this.serviceVehicleType
      .addEntity(vehicleType)
      .subscribe(
        newVehicleType => this.createVehicleType.next(newVehicleType),
        _ => this.toast.error('Не вдалось створити тип транспорт', 'Помилка створення нового типу транспорту')
      );
    this.closeDiv.nativeElement.click();
  }
}
