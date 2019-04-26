
import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Malfunction } from '../../models/malfunc/malfunc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MalfunSubgroup } from '../../models/malfun-subgroup/malfun-subgroup';
import { MalfunSubgroupService } from '../../services/malfun-subgroup.service';
import { MalfuncService } from '../../services/malfunc.service';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from '../../services/malfunc-group.service';
import { TEntity } from 'src/app/modules/core/models/entity/entity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-malfunc',
  templateUrl: './edit-malfunc.component.html',
  styleUrls: ['./edit-malfunc.component.scss']
})
export class EditMalfuncComponent implements OnInit {
  malfunctionForm: FormGroup;
  curentMalfunction: Malfunction;

  @ViewChild('close') closeDiv: ElementRef;

  @Input()
  set malfunction(malfunction: Malfunction) {
    if (!malfunction) {
      return;
    }
    this.curentMalfunction = malfunction;
    this.malfunctionForm.patchValue({
      ...malfunction,
      group: malfunction.malfunctionSubgroup.malfunctionGroup.name,
      subgroup: malfunction.malfunctionSubgroup.name
    });
  }

  @Output() editedMalfunction = new EventEmitter<Malfunction>();

  malfunctionSubgroupList: MalfunSubgroup[];
  malfunctionGroupList: MalfuncGroup[];
  malfunctions: Malfunction[];

  constructor(
    private formBuilder: FormBuilder,
    private serviceMalfunctionGroup: MalfuncGroupService,
    private serviceMalfuncSubGroup: MalfunSubgroupService,
    private serviceMalfunction: MalfuncService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.malfunctionForm = this.formBuilder.group({
      group: ['', Validators.required],
      subgroup: '',
      name: ['', Validators.required]
    });
    this.loadEntities();
  }

  get malfunctionSubgroupsFilteredByGroup(): MalfunSubgroup[] {
    const selectedGroup = this.malfunctionForm.value.group;
    const filteredSubgroups = this.filterSubgroupsByGroup(selectedGroup);
    return filteredSubgroups;
  }

  private filterSubgroupsByGroup(group: MalfuncGroup): MalfunSubgroup[] {
    const subgroups = this.malfunctionSubgroupList;
    if (!group) {
      return subgroups;
    }
    const filteredSubgroups = this.malfunctionSubgroupList.filter(
      subgroup => subgroup.malfunctionGroup.name === group.name
    );

    if (this.notSelectedSubgroup(filteredSubgroups)) {
      this.setDefaultSubgroup();
    }
    return filteredSubgroups;
  }
  private notSelectedSubgroup(subgroups: MalfunSubgroup[]): boolean {
    return subgroups.findIndex(s => s === this.malfunctionForm.value.subgroup) === -1;
  }

  private setDefaultSubgroup(): void {
    this.malfunctionForm.patchValue({ subgroup: '' });
  }
  private loadEntities() {
    this.serviceMalfunctionGroup.getEntities().subscribe(malfunctionGroupList => {
      this.malfunctionGroupList = malfunctionGroupList;
    });

    this.serviceMalfunction.getEntities().subscribe(malfunctions => {
      this.malfunctions = malfunctions;

      const allSubgroups = malfunctions.map(m => m.malfunctionSubgroup);
      this.malfunctionSubgroupList = Array.from(this.getDistinct(allSubgroups));
    });
  }

  private getDistinct<T extends TEntity<T>>(entities: T[]) {
    return entities.filter((value, index, self) => self.findIndex(item => item.id === value.id) === index);
  }

  updateData() {
    const malfunc = new Malfunction({
      id: this.curentMalfunction.id,
      name: this.malfunctionForm.value.name,
      malfunctionSubgroup: this.malfunctionForm.value.subgroup
    });
    this.closeDiv.nativeElement.click();
    this.serviceMalfunction
      .updateEntity(malfunc)
      .subscribe(
        newMalfunction => this.editedMalfunction.next(malfunc),
        _ => this.toast.error('Не вдалось створити помилку', 'Помилка вже існує у заявках')
      );
  }
}
