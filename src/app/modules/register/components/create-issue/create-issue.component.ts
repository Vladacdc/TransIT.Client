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
import { TEntity } from 'src/app/modules/core/models/entity/entity';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  @Output() createdIssue = new EventEmitter<Issue>();

  issueForm: FormGroup;
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
    this.setUpForm();
    this.loadEntities();
  }

  onSubmit() {
    if (this.issueForm.invalid) {
      return;
    }
    this.createIssue();
    this.setUpForm();
    this.hideModalWindow();
  }

  get malfunctionSubgroupsFilteredByGroup(): MalfunctionSubgroup[] {
    const selectedGroup = this.formValue.malfunctionGroup;
    const filteredSubgroups = this.filterSubgroupsByGroup(selectedGroup);
    return filteredSubgroups;
  }

  get malfunctionsFilteredByGroup(): MalfunctionGroup[] {
    const selectedSubgroup = this.formValue.malfunctionSubgroup;
    const filteredMalfunctions = this.filterMalfunctionsBySubgroup(selectedSubgroup);
    return filteredMalfunctions;
  }

  clickSubmit(button: HTMLButtonElement) {
    button.click();
  }

  private setUpForm() {
    this.issueForm = this.fb.group({
      vehicle: ['', Validators.required],
      malfunctionGroup: '',
      malfunctionSubgroup: '',
      malfunction: ['', Validators.required],
      summary: ['', Validators.required]
    });
  }

  private loadEntities() {
    this.vehicleService.getEntities().subscribe(data => (this.vehicles = data));
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
        newIssue => this.createdIssue.next(newIssue),
        _ => this.toast.error('Не вдалось створити заявку', 'Помилка створення заявки')
      );
  }

  private get formValue() {
    return this.issueForm.value;
  }

  private hideModalWindow() {
    const modalWindow: any = $('#createIssue');
    modalWindow.modal('hide');
  }

  private filterSubgroupsByGroup(group: MalfunctionGroup): MalfunctionSubgroup[] {
    const subgroups = this.malfunctionSubgroups;
    if (!group) {
      return subgroups;
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
    this.issueForm.patchValue({ malfunctionSubgroup: '' });
  }

  private filterMalfunctionsBySubgroup(subgroup: MalfunctionSubgroup): Malfunction[] {
    const malfunctions = this.malfunctions;
    const filteredMalfunctions = malfunctions.filter(malfunction => {
      if (!subgroup) {
        const subgroups = this.malfunctionSubgroupsFilteredByGroup;
        return subgroups.findIndex(item => item.name === malfunction.malfunctionSubgroup.name) !== -1;
      } else {
        return malfunction.malfunctionSubgroup.name === subgroup.name;
      }
    });

    if (this.notSelectedMalfunction(filteredMalfunctions)) {
      this.setDefaultMalfunction();
    }
    return filteredMalfunctions;
  }

  private notSelectedMalfunction(malfunctions: Malfunction[]): boolean {
    return malfunctions.findIndex(m => m === this.formValue.malfunction) === -1;
  }

  private setDefaultMalfunction(): void {
    this.issueForm.patchValue({ malfunction: '' });
  }
}
