import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { malfunctionSelectedValidator } from 'src/app/custom-errors';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { Issue } from 'src/app/modules/shared/models/issue';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';
import { IssueService } from 'src/app/modules/shared/services/issue.service';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';
import { VehicleType } from 'src/app/modules/shared/models/vehicleType';


import {MatDialog, MatDialogConfig} from '@angular/material';
import {MatDialogComponent} from 'src/app/modules/shared/components/mat-dialog/mat-dialog.component';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  @Output() addIssue = new EventEmitter<Issue>();

  issueForm: FormGroup;
  vehicles: Vehicle[] = [];
  vehicleTypes: VehicleType[] = [];
  malfunctionGroups: MalfunctionGroup[] = [];
  malfunctionSubgroups: MalfunctionSubgroup[] = [];
  malfunctions: Malfunction[] = [];

  malfunctionSubgroupsFilteredByGroup: MalfunctionSubgroup[] = [];
  malfunctionsFilteredByGroup: Malfunction[] = [];
  vehiclesFilteredByTypes: Vehicle[] = [];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private malfunctionService: MalfunctionService,
    private issueService: IssueService,
    private toast: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.setUpForm();
    this.loadEntities();
    this.configureMalfunctionControls();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig. disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      group: this.fb.group( {
        boardNumber: new FormControl(
          '',
          [Validators.maxLength(10), Validators.pattern('^[A-Za-zА-Яа-я0-9їієЇІЯЄ/\'/`-]+$'),]
        ),
        lastName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$'),]
          )
        ),
        firstName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')]),
        ),
        middleName: new FormControl(
          '',
          Validators.compose([Validators.maxLength(30), Validators.pattern('^[A-Za-zА-Яа-яїієЇІЯЄ/\'/`-]+$')]),
        ),
        phoneNumber: new FormControl(
          '',
          Validators.minLength(12),
        ),
        userName: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9]+$')]),
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
        ),
        email: new FormControl(
          '',
          Validators.compose([Validators.email, Validators.maxLength(30)])
        ),
        role: new FormControl('', Validators.required, )
      }),
    buttons: {
      cancel: 'Cancel',
      submit: 'Create'
    }};
    const dialogRef = this.dialog.open(MatDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(x => {
    if (x !== undefined) {
      this.testMethod(x);
    }
    });
}
testMethod(form: FormGroup) {
  Object.keys(form.controls).forEach((key: string) => {
    const control = form.get(key);
    if (control instanceof FormGroup) {
      console.log(control.value);
    }
  });
}
//////////////////////////////////////////////////////
  onSubmit() {
    if (this.issueForm.invalid) {
      return;
    }
    this.createIssue();
    this.hideModalWindow();
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  closeModal() {
    this.hideModalWindow();
  }

  configureMalfunctionControls() {
    const { malfunctionGroup, malfunctionSubgroup, malfunction, vehicle, vehicleType } = this.issueForm.controls;

    this.setDependentControl(malfunctionGroup, malfunctionSubgroup);
    this.setDependentControl(malfunctionSubgroup, malfunction);
    this.setDependentControl(vehicleType, vehicle);
  }

  reload() {
    this.malfunctionSubgroupsFilteredByGroup = this.getMalfunctionSubgroupsFilteredByGroup();
    this.malfunctionsFilteredByGroup = this.getMalfunctionsFilteredByGroup();
    this.vehiclesFilteredByTypes = this.getVehiclesFilteredByTypes();
  }

  private setUpForm() {
    this.issueForm = this.fb.group(
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

  private loadEntities() {
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

  private getDistinct<T extends TEntity<T>>(entities: T[]) {
    return entities.filter((value, index, self) => self.findIndex(item => item.id === value.id) === index);
  }

  private createIssue() {
    const issue = new Issue(this.formValue);
    this.issueService
      .addEntity(issue)
      .subscribe(
        newIssue => this.addIssue.next(newIssue),
        _ => this.toast.error('Не вдалось створити заявку', 'Помилка створення заявки')
      );
  }

  private get formValue() {
    return this.issueForm.value;
  }

  private hideModalWindow() {
    const modalWindow: any = $('#createIssue');
    modalWindow.modal('hide');
    this.issueForm.reset();
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
