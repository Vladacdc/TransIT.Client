import { Component, OnInit, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.scss']
})
export class CreateVehicleComponent implements OnInit {
  constructor(
    private serviceVehicleType: VehicleTypeService,
    private serviceVehicle: VehicleService,
    private formBuilder: FormBuilder,
    private toast: ToastrService
  ) { }

  get vehicleTypeName(): string[] {
    return this.vehicleTypeList.map(t => t.name);
  }
  @ViewChild('close') closeDiv: ElementRef;
  @Output() createVehicle = new EventEmitter<Vehicle>();
  vehicleForm: FormGroup;
  vehicleTypeList: VehicleType[] = [];

  ngOnInit() {
    $('#createVehicle').on('hidden.bs.modal', function () {
      $(this)
        .find('form')
        .trigger('reset');
    });
    this.vehicleForm = this.formBuilder.group({
      vehicleType: new FormControl('', Validators.required),
      vincode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(17), Validators.maxLength(17)])),
      inventoryId: '',
      regNum: new FormControl('', Validators.minLength(8)),
      brand: '',
      model: '',
      commissioningDate: '',
      warrantyEndDate: ''
    });
    this.serviceVehicleType.getEntities().subscribe(data => (this.vehicleTypeList = data));
  }

  clickSubmit() {
    if (this.vehicleForm.invalid) {
      return;
    }

    const form = this.vehicleForm.value;
    const vehicle: Vehicle = new Vehicle({
      id: 0,
      vehicleType: this.vehicleTypeList[this.vehicleTypeName.findIndex(t => t === form.vehicleType)],
      vincode: form.vincode as string,
      inventoryId: form.inventoryId as string,
      regNum: form.regNum as string,
      brand: form.brand as string,
      model: form.model as string,
      commissioningDate: form.commissioningDate as Date,
      warrantyEndDate: form.warrantyEndDate as Date
    });
    this.serviceVehicle
      .addEntity(vehicle)
      .subscribe(
        newVehicle => this.createVehicle.next(newVehicle),
        _ => this.toast.error('Не вдалось створити транспорт', 'Помилка створення нового транспорту')
      );
    this.closeDiv.nativeElement.click();
  }
}
