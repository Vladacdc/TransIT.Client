import { Component, OnInit, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Vehicle } from '../../models/vehicle/vehicle';
import { VehicleType } from '../../models/vehicleType/vehicle-type';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createVehicle = new EventEmitter<Vehicle>();
  vehicleForm: FormGroup;
  vehicleTypeList: VehicleType[] = [];

  constructor(private serviceVehicleType: VehicleTypeService, private serviceVehicle: VehicleService, private formBuilder: FormBuilder, private toast: ToastrService) { }

  ngOnInit() {
    $('#createVehicle').on('hidden.bs.modal', function () {
      $(this).find('form').trigger('reset');
    });
    this.vehicleForm = this.formBuilder.group({
      vehicleType: new FormControl('', Validators.required),
      vincode: new FormControl('', Validators.minLength(8)),
      inventoryId: '',
      regNum: new FormControl('', Validators.minLength(8)),
      brand: '',
      model: ''
    });
    this.serviceVehicleType.getEntities().subscribe(data => (this.vehicleTypeList = data));
  }

  clickSubmit() {
    if (this.vehicleForm.invalid) {
      return;
    }

    const form = this.vehicleForm.value;
    const vehicle: Vehicle = {
      id: 0,
      vehicleType: this.vehicleTypeList[this.vehicleTypeName.findIndex(t => t === form.vehicleType)],
      vincode: form.vincode as string,
      inventoryId: form.inventoryId as string,
      regNum: form.regNum as string,
      brand: form.brand as string,
      model: form.model as string,
    };
    this.serviceVehicle.addEntity(vehicle).subscribe(newVehicle => this.createVehicle.next(newVehicle), _ => this.toast.error('Не вдалось створити транспорт', 'Помилка створення нового транспорту'));
    this.closeDiv.nativeElement.click();
  }

  get vehicleTypeName(): string[] {
    return this.vehicleTypeList.map(t => t.name);
  }

  validation_messages = {
    vehicleType: [{ type: 'required', message: 'Оберіть тип транспорту' }],
    vincode: [
      { type: 'minlength', message: 'Vin-код має мати 8 символів' }
    ],
    regNum: [{ type: 'minlength', message: 'Введіть коректно номер' }]
  };
}
