import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';
import { DatePipe } from '@angular/common';
import { NUM_FIELD_ERRORS, LET_NUM_FIELD_ERRORS } from 'src/app/custom-errors';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { Location } from 'src/app/modules/shared/models/location';
import { IssueLog } from 'src/app/modules/shared/models/issuelog';

@Component({
  selector: 'app-info-vehicle',
  templateUrl: './info-vehicle.component.html',
  styleUrls: ['./info-vehicle.component.scss'],
  providers: [DatePipe]
})
export class InfoVehicleComponent implements OnInit {
  @Input()
  set vehicle(vehicle: Vehicle) {
    if (!vehicle) {
      return;
    }
    this.vehicleForm.patchValue({
      ...vehicle,
      vehicleType: vehicle.vehicleType.name,
      location: vehicle.location && vehicle.location.name,
      commissioningDate: this.datePipe.transform(vehicle.commissioningDate, 'yyyy-MM-dd'),
      warrantyEndDate: this.datePipe.transform(vehicle.warrantyEndDate, 'yyyy-MM-dd')
    });
    this.selectedVehicle = vehicle;
  }

  constructor(
    private formBuilder: FormBuilder,
    private serviceVehicleType: VehicleTypeService,
    private serviceVehicle: VehicleService,
    private serviceLocation: LocationService,
    private datePipe: DatePipe,
    private toast: ToastrService,
    private issueLog: IssueLog
  ) { }
  @ViewChild('close') closeDiv: ElementRef;
  @Output() updateVehicle = new EventEmitter<Vehicle>();

  selectedVehicle = new Vehicle({});
  vehicleForm: FormGroup;
  vehicleTypeList: VehicleType[] = [];
  locationList: Location[] = [];

  CustomNumErrorMessages = NUM_FIELD_ERRORS;
  CustomLetNumErrorMessages = LET_NUM_FIELD_ERRORS;

  ngOnInit() {
    $('#infoVehicle').on('hidden.bs.modal', () => {
      this.vehicleForm.patchValue({
        ...this.selectedVehicle,
        vehicleType: this.selectedVehicle.vehicleType.name,
        location: this.selectedVehicle.location && this.selectedVehicle.location.name,
        commissioningDate: this.datePipe.transform(this.selectedVehicle.commissioningDate, 'yyyy-MM-dd'),
        warrantyEndDate: this.datePipe.transform(this.selectedVehicle.warrantyEndDate, 'yyyy-MM-dd')
      });
      $(this).find('form').trigger('reset');
    });
    console.log("info-vehicle-hello2");
    this.vehicleForm = this.formBuilder.group({
      id: '',
      vehicleType: new FormControl('', Validators.required),
      vincode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(17), Validators.maxLength(17), Validators.pattern('^[A-Za-z0-9]+$')])),
      inventoryId: new FormControl('', Validators.pattern('^[0-9]+$')),
      regNum: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15), Validators.pattern('^[A-Z0-9a-zА-Яа-яїієЇІЯЄ]+$')])),
      brand: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[A-Z0-9a-zА-Яа-яїієЇІЯЄ]+$')])),
      model: new FormControl('', Validators.compose([Validators.minLength(1), Validators.maxLength(30)])),
      commissioningDate: new FormControl('', Validators.required),
      warrantyEndDate: new FormControl('', Validators.required),
      location: new FormControl('')
    });
    this.serviceVehicleType.getEntities().subscribe(data => (this.vehicleTypeList = data.sort((a, b) => a.name.localeCompare(b.name))));
    this.serviceLocation.getEntities().subscribe(data => (this.locationList = data));
    console.log("info-vehicle-hello3");
  }
}
