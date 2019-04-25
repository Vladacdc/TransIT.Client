import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../../models/vehicle/vehicle';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { VehicleType } from '../../models/vehicleType/vehicle-type';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { VehicleService } from '../../services/vehicle.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input()
  set vehicle(vehicle: Vehicle) {
    if (!vehicle) {
      return;
    }
    this.vehicleForm.patchValue({ ...vehicle, vehicleType: vehicle.vehicleType.name });
  }
  @Output() updateVehicle = new EventEmitter<Vehicle>();

  vehicleForm: FormGroup;
  vehicleTypeList: VehicleType[] = [];

  constructor(private formBuilder: FormBuilder, private serviceVehicleType: VehicleTypeService, private serviceVehicle: VehicleService, private toast: ToastrService) { }

  ngOnInit() {
    this.vehicleForm = this.formBuilder.group({
      id: '',
      vehicleType:  new FormControl('', Validators.required),
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
    const vehicle: Vehicle = {
      id: form.id as number,
      vehicleType: this.vehicleTypeList.find(t => t.name === form.vehicleType),
      vincode: form.vincode as string,
      inventoryId: form.inventoryId as string,
      regNum: form.regNum as string,
      brand: form.brand as string,
      model: form.model as string,
    };
    console.log(vehicle);
    this.serviceVehicle.updateEntity(vehicle).subscribe(data => this.updateVehicle.next(vehicle), _ => this.toast.error('Не вдалось редагувати дані про транспорт', 'Помилка редагування даних'));

  }

  validation_messages = {
    vehicleType: [{ type: 'required', message: 'Оберіть тип транспорту' }],
    vincode: [
      { type: 'minlength', message: 'Vin-код має мати 8 символів' }
    ],
    regNum: [{ type: 'minlength', message: 'Введіть коректно номер' }]
  };
}
