import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  @Input()
  set vehicle(vehicle: Vehicle) {
    if (!vehicle) {
      return;
    }
    this.vehicleForm.patchValue({ ...vehicle, vehicleType: vehicle.vehicleType.name });
  }

  constructor(
    private formBuilder: FormBuilder,
    private serviceVehicleType: VehicleTypeService,
    private serviceVehicle: VehicleService,
    private toast: ToastrService
  ) {}
  @ViewChild('close') closeDiv: ElementRef;
  @Output() updateVehicle = new EventEmitter<Vehicle>();

  vehicleForm: FormGroup;
  vehicleTypeList: VehicleType[] = [];

  validation_messages = {
    vehicleType: [{ type: 'required', message: 'Оберіть тип транспорту' }],
    vincode: [{ type: 'minlength', message: 'Vin-код має мати 8 символів' }],
    regNum: [{ type: 'minlength', message: 'Введіть коректно номер' }]
  };

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      id: '',
      vehicleType: new FormControl('', Validators.required),
      vincode: new FormControl('', Validators.minLength(8)),
      inventoryId: '',
      regNum: new FormControl('', Validators.minLength(8)),
      brand: '',
      model: ''
    });
    this.serviceVehicleType.getEntities().subscribe(data => (this.vehicleTypeList = data));
  }

  updateData() {
    if (this.vehicleForm.invalid) {
      return;
    }
    this.closeDiv.nativeElement.click();
    const form = this.vehicleForm.value;
    const vehicle: Vehicle = new Vehicle({
      id: form.id as number,
      vehicleType: this.vehicleTypeList.find(t => t.name === form.vehicleType),
      vincode: form.vincode as string,
      inventoryId: form.inventoryId as string,
      regNum: form.regNum as string,
      brand: form.brand as string,
      model: form.model as string
    });
    console.log(vehicle);
    this.serviceVehicle
      .updateEntity(vehicle)
      .subscribe(
        data => this.updateVehicle.next(vehicle),
        _ => this.toast.error('Не вдалось редагувати дані про транспорт', 'Помилка редагування даних')
      );
  }
}
