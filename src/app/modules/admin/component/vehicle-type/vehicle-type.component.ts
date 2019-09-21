import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { ToastrService } from 'ngx-toastr';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { VehicleTypeService } from 'src/app/modules/shared/services/vehicle-type.service';
import { Component, OnInit, ViewChild, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CFB$EntryType } from 'cfb/types';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.scss']
})
export class VehicleTypeComponent implements OnInit {

  columnDefinitions: string[] = [
    'name'
  ];
  columnNames: string[] = [
    'Тип транспорту'
  ]

  @ViewChild('table') table: MatFspTableComponent;

  messageCreate: 'Створити тип транспорту';
  messageDelete: 'Ви дійсно хочeте видалити цей тип транспорту';

  dataSource: EntitiesDataSource<VehicleType>;

  vehicleTypeForm = this.formBuilder.group({
    name: ''
  });

  vehicleTypeFormValue: FormGroup;


  controls: any[] = [
    {
      containerType: 'input',
      formControlName: 'name',
      placeHolder: 'Введіть тип траспорту',
      labelName: 'Тип Транспорту',
      required: false
    }
  ];


  constructor(private vehicleTypeService: VehicleTypeService,
              private formBuilder: FormBuilder,
              private toast: ToastrService) { }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<VehicleType>(this.vehicleTypeService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }


  clickSubmit(formValue: FormGroup) {
    if (formValue.invalid) {
            return;
    }
    const form = formValue.value;
    const vehicleType: VehicleType = {
      id: 0,
      name: form.name as string
    };
    this.vehicleTypeService
      .addEntity(vehicleType)
      .subscribe(
        newVehicleType => this.refreshTable(),
        _ => this.toast.error('Не вдалось створити тип транспорт', 'Помилка створення нового типу транспорту')
      );
  }

  delete() {
    this.vehicleTypeService
      .deleteEntity(this.vehicleType.id)
      .subscribe(
        data => this.deleteVehicleType.next(this.vehicleType),
        _ => this.toast.error('Не вдалось видалити тип транспорту', 'Помилка видалення типу транспорту')
      );
  }
}
