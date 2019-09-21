import { Component, ViewChild, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Priority } from '../../models/priority/priority';
import { DatatableSettings } from 'src/app/modules/shared/helpers/datatable-settings';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { malfunctionSelectedValidator } from 'src/app/custom-errors';
import { ToastrService } from 'ngx-toastr';

import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { Issue } from 'src/app/modules/shared/models/issue';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';
import { TEntity } from 'src/app/modules/core/models/entity/entity';
@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnDestroy, AfterViewInit {
  readonly options: DatatableSettings = new DatatableSettings({
    ajax: (dataTablesParameters: any, callback) => {
      this.issueService.getFilteredEntities(dataTablesParameters).subscribe(response => {
        this.issues = response.data;
        callback({ ...response, data: [] });
        this.adjustColumns();
      });
    },
    columns: [
      { data: 'number' },
      { data: 'vehicle.model' },
      { data: 'state.transName' },
      { data: 'malfunction.name' },
      { data: 'date' },
      { data: 'summary' },
      { data: null, orderable: false }
    ],
    language: {
      url: 'assets/language.json'
    },
    order: [[0, 'desc']],
    serverSide: true,
    processing: true
  });


  issueForm = this.fb.group(
    {
  vehicleType: [null, Validators.required],
  vehicle: [{ value: null, disabled: true }, Validators.required],
  malfunctionGroup: null,
  malfunctionSubgroup: [{ value: null, disabled: true }],
  malfunction: [{ value: null, disabled: true }],
  date: [new Date(), Validators.required],
  summary: ['', Validators.required]
},
{ validators: malfunctionSelectedValidator }
    );

  vehicles: Vehicle[] = [];
  vehicleTypes: VehicleType[] = [];
  malfunctionGroups: MalfunctionGroup[] = [];
  malfunctionSubgroups: MalfunctionSubgroup[] = [];
  malfunctions: Malfunction[] = [];

  malfunctionSubgroupsFilteredByGroup: MalfunctionSubgroup[] = [];
  malfunctionsFilteredByGroup: Malfunction[] = [];
  vehiclesFilteredByTypes: Vehicle[] = [];




  controls: any[] = [
    {
      containerType: 'date',
      formControlName: 'date',
      placeHolder: 'Дата заявки',
      labelName: 'Дата заявки',
      required: true
    },
    {
      containerType: 'selectWithProperies',
      formControlName: 'vehicleType',
      placeHolder: 'Виберіть вид транспорту',
      labelName: 'Вид транспорту',
      required: true,
      items: this.vehicleTypes
    },
    {
      containerType: 'select',
      formControlName: 'vehicle',
      placeHolder: 'Виберіть транспорт',
      labelName: 'Транспорт',
      required: false,
      items: this.vehiclesFilteredByTypes
    },

    {
      containerType: 'selectWithProperies',
      formControlName: 'malfunctionGroup',
      placeHolder: 'Виберіть групу несправності',
      labelName: 'Група несправності',
      required: false,
      items: this.malfunctionGroups
    },
    {
      containerType: 'selectWithProperies',
      formControlName: 'malfunctionSubgroup',
      placeHolder: 'Виберіть підгрупу несправності',
      labelName: 'Підгрупа несправності',
      required: false,
      items: this.malfunctionSubgroups
    },
    {
      containerType: 'selectWithProperies',
      formControlName: 'malfunction',
      placeHolder: 'Виберіть несправність',
      labelName: 'Несправність',
      required: false,
      items: this.malfunctions
    },
    {
      containerType: 'textarea',
      formControlName: 'summary',
      placeHolder: 'Опишіть вашу поломку',
      labelName: 'Опис несправності',
      required: true
    }
  ];

  issueFormGroup: FormGroup;
  issues: Issue[] = [];
  selectedIssue: Issue;
  renderTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) datatableElement: DataTableDirective;

  constructor(private fb: FormBuilder,
              private issueService: IssueService,
              private toast: ToastrService,
              private vehicleService: VehicleService,
              private malfunctionService: MalfunctionService) {

    this.vehicleService.getEntities().subscribe(data => {
      this.vehicles = data;

      const allTypes = this.vehicles.map(v => v.vehicleType);
      this.vehicleTypes = Array.from(this.getDistinct(allTypes));
    });

    this.malfunctionService.getEntities().subscribe(malfunctions => {
      this.malfunctions = malfunctions;

      const allSubgroups = malfunctions.map(m => m.malfunctionSubgroup);
      this.malfunctionSubgroups = Array.from(this.getDistinct(allSubgroups));

      const allGroups = this.malfunctionSubgroups.map(s => s.malfunctionGroup);
      this.malfunctionGroups = Array.from(this.getDistinct(allGroups));
    });
              }

  ngOnOnit() {
    this.createIssue(this.issueFormGroup);

    this.loadEntities();
    this.configureMalfunctionControls();
  }

  ngAfterViewInit(): void {
    this.renderTrigger.next();
  }

  ngOnDestroy(): void {
    this.renderTrigger.unsubscribe();
  }

  reloadTable(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.renderTrigger.next();
    });
  }

  selectIssue(issue: Issue) {
    this.selectedIssue = new Issue({ ...issue });
  }

  getPriorityClass(issue: Issue) {
    return `priority-${Priority[issue.priority]}`;
  }

  private adjustColumns() {
    setTimeout(() => $(window).trigger('resize'), 0);
  }

  private get formValue() {
    return this.issueFormGroup.value;
  }

  private createIssue(form: FormGroup) {
    const issue = new Issue(form.value);
    this.issueService
      .addEntity(issue)
      .subscribe(
        newIssue => {},
        _ => this.toast.error('Не вдалось створити заявку', 'Помилка створення заявки')
      );
    this.reloadTable();
  }

  private loadEntities() {
    
  }

  private getDistinct<T extends TEntity<T>>(entities: T[]) {
    return entities.filter((value, index, self) => self.findIndex(item => item.id === value.id) === index);
  }
  reload() {
    this.malfunctionSubgroupsFilteredByGroup = this.getMalfunctionSubgroupsFilteredByGroup();
    this.malfunctionsFilteredByGroup = this.getMalfunctionsFilteredByGroup();
    this.vehiclesFilteredByTypes = this.getVehiclesFilteredByTypes();
  }

  configureMalfunctionControls() {
    const { malfunctionGroup, malfunctionSubgroup, malfunction, vehicle, vehicleType } = this.issueForm.controls;

    this.setDependentControl(malfunctionGroup, malfunctionSubgroup);
    this.setDependentControl(malfunctionSubgroup, malfunction);
    this.setDependentControl(vehicleType, vehicle);
  }

  private getMalfunctionSubgroupsFilteredByGroup(): MalfunctionSubgroup[] {
    const selectedGroup = this.formValue.malfunctionGroup;
    const filteredSubgroups = this.filterSubgroupsByGroup(selectedGroup);
    return filteredSubgroups;
  }

  private getMalfunctionsFilteredByGroup(): Malfunction[] {
    const selectedSubgroup = this.formValue.malfunctionSubgroup;
    const filteredMalfunctions = this.filterMalfunctionsBySubgroup(selectedSubgroup);
    return filteredMalfunctions;
  }

  private getVehiclesFilteredByTypes(): Vehicle[] {
    const selectedType = this.formValue.vehicleType;
    const filteredVehicles = this.filterVehiclesByTypes(selectedType);
    return filteredVehicles;
  }

  private filterSubgroupsByGroup(group: MalfunctionGroup): MalfunctionSubgroup[] {
    if (!group) {
      this.setDefaultSubgroup();
      return [];
    }
    const filteredSubgroups = this.malfunctionSubgroups.filter(
      subgroup => subgroup.malfunctionGroup.name === group.name
    );

    if (this.notSelectedSubgroup(filteredSubgroups)) {
      this.setDefaultSubgroup();
    }
    return filteredSubgroups;
  }

  private notSelectedSubgroup(subgroups: MalfunctionSubgroup[]): boolean {
    return subgroups.findIndex(s => s === this.formValue.malfunctionSubgroup) === -1;
  }

  private setDefaultSubgroup(): void {
    this.issueForm.patchValue({ malfunctionSubgroup: null });
  }

  private filterMalfunctionsBySubgroup(subgroup: MalfunctionSubgroup): Malfunction[] {
    if (!subgroup) {
      this.setDefaultMalfunction();
      return [];
    }

    const filteredMalfunctions = this.malfunctions.filter(
      malfunction => malfunction.malfunctionSubgroup.name === subgroup.name
    );

    if (this.notSelectedMalfunction(filteredMalfunctions)) {
      this.setDefaultMalfunction();
    }
    return filteredMalfunctions;
  }

  private notSelectedMalfunction(malfunctions: Malfunction[]): boolean {
    return malfunctions.findIndex(m => m === this.formValue.malfunction) === -1;
  }

  private setDefaultMalfunction(): void {
    this.issueForm.patchValue({ malfunction: null });
  }

  private filterVehiclesByTypes(type: VehicleType): Vehicle[] {
    if (!type) {
      this.setDefaultVehicle();
      return [];
    }
    const filteredVehicles = this.vehicles.filter(vehicle => vehicle.vehicleType.name === type.name);

    if (this.notSelectedVehicle(filteredVehicles)) {
      this.setDefaultVehicle();
    }
    return filteredVehicles;
  }

  private setDefaultVehicle(): void {
    this.issueForm.patchValue({ vehicle: null });
  }

  private notSelectedVehicle(vehicles: Vehicle[]): boolean {
    return vehicles.findIndex(v => v === this.formValue.vehicle) === -1;
  }

  private setDependentControl(main: AbstractControl, dependent: AbstractControl) {
    main.valueChanges.subscribe(selectedValue => {
      if (selectedValue !== null) {
        dependent.enable();
      } else {
        dependent.disable();
        dependent.setValue(null);
      }
    });
  }
}
