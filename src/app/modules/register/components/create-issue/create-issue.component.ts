import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { MalfunctionService } from '../../services/malfunction.service';
import { Vehicle } from '../../models/vehicle';
import { MalfunctionSubgroup } from '../../models/malfunction-subgroup';
import { Malfunction } from '../../models/malfunction';
import { MalfunctionGroup } from '../../models/malfunction-group';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  issueForm: FormGroup;

  @Output() createdIssue = new EventEmitter<Issue>();

  vehicles: Vehicle[] = [];
  malfunctionGroups: MalfunctionGroup[] = [];
  malfunctionSubgroups: MalfunctionSubgroup[] = [];
  malfunctions: Malfunction[] = [];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private malfunctionService: MalfunctionService,
    private issueService: IssueService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.issueForm = this.fb.group({
      vehicle: ['', Validators.required],
      malfunctionGroup: '',
      malfunctionSubgroup: '',
      malfunction: ['', Validators.required],
      summary: ['', Validators.required]
    });

    this.vehicleService.getEntities().subscribe(data => (this.vehicles = data));
    this.malfunctionService.getEntities().subscribe(malfunctions => {
      const filterFunct = (val: MalfunctionGroup | MalfunctionSubgroup, index: number, a: MalfunctionGroup[] | MalfunctionSubgroup[]) => {
        return a.findIndex(v => v.name === val.name) === index;
      };
      this.malfunctions = malfunctions;
      this.malfunctionSubgroups = malfunctions.map(m => m.malfunctionSubgroup).filter(filterFunct);
      this.malfunctionGroups = this.malfunctionSubgroups.map(s => s.malfunctionGroup).filter(filterFunct);
    });
  }

  onSubmit() {
    if (this.issueForm.invalid) {
      return;
    }

    const form = this.issueForm.value;
    const malfunction = this.malfunctions.find(m => m.name === form.malfunction);
    const vehicle = this.vehicles.find(v => this.vehicleName(v) === form.vehicle);
    const summary = form.summary as string;

    const issue: Issue = {
      summary,
      malfunction: { id: malfunction.id },
      vehicle: { id: vehicle.id }
    };

    this.issueService
      .addEntity(issue)
      .subscribe(
        newIssue => this.createdIssue.next(newIssue),
        _ => this.toast.error('Не вдалось створити заявку', 'Помилка створення заявки')
      );

    this.issueForm.reset();
    const modalWindow: any = $('#createIssue');
    modalWindow.modal('hide');
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  get vehiclesNames(): string[] {
    return this.vehicles.map(vehicle => this.vehicleName(vehicle));
  }

  get groupsNames(): string[] {
    return this.malfunctionGroups.map(g => g.name);
  }

  get subgroupsNames(): string[] {
    const subgroups = this.malfunctionSubgroups
      .filter(val => {
        const group = this.issueForm.value.malfunctionGroup;
        if (!group) {
          return true;
        }
        return val.malfunctionGroup.name === group;
      })
      .map(s => s.name);
    if (subgroups.findIndex(s => s === this.issueForm.value.malfunctionSubgroup) === -1) {
      this.issueForm.patchValue({ malfunctionSubgroup: '' });
    }
    return subgroups;
  }

  get malfunctionsNames(): string[] {
    const malfunctions = this.malfunctions
      .filter(val => {
        const subgroup = this.issueForm.value.malfunctionSubgroup;
        if (!subgroup) {
          const subgroups = this.subgroupsNames;
          return subgroups.findIndex(v => v === val.malfunctionSubgroup.name) !== -1;
        } else {
          return val.malfunctionSubgroup.name === subgroup;
        }
      })
      .map(m => m.name);
    if (malfunctions.findIndex(m => m === this.issueForm.value.malfunction) === -1) {
      this.issueForm.patchValue({ malfunction: '' });
    }
    return malfunctions;
  }

  private vehicleName(vehicle: Vehicle): string {
    return `${vehicle.brand} ${vehicle.model} ${vehicle.vincode || ''} ${vehicle.inventoryId || ''} ${vehicle.regNum || ''}`;
  }
}
