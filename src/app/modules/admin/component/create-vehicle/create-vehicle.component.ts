import { Component, OnInit, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Vehicle } from '../../models/vehicle/vehicle';
import { VehicleType } from '../../models/vehicleType/vehicle-type';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeService } from '../../services/vehicle-type.service';

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

  constructor(private serviceVehicleType: VehicleTypeService, private serviceVehicle: VehicleService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    $('#createVehicle').on('hidden.bs.modal', function () {
      $(this).find('form').trigger('reset');
    });
    this.vehicleForm = this.formBuilder.group({
      vehicleType: ['', Validators.required],
      vincode: '',
      inventoryId: '',
      regNum: '',
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
    this.serviceVehicle.addEntity(vehicle).subscribe(_ => this.createVehicle.next(vehicle));
    this.closeDiv.nativeElement.click();
  }

  get vehicleTypeName(): string[] {
    return this.vehicleTypeList.map(t => t.name);
  }
}
