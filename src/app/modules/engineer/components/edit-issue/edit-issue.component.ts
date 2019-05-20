import { Component, OnInit } from '@angular/core';
import { Issue } from '../../../shared/models/issue';
import { IssueService } from '../../../shared/services/issue.service';
import { ToastrService } from 'ngx-toastr';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunctionGroup';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunctionSubgroup';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfuncGroupService } from 'src/app/modules/admin/services/malfunc-group.service';
import { MalfunSubgroupService } from 'src/app/modules/admin/services/malfun-subgroup.service';
import { MalfuncService } from 'src/app/modules/admin/services/malfunc.service';
import { ResourceLoader } from '@angular/compiler';


@Component({
  selector: 'app-edit-issue',
  templateUrl: './edit-issue.component.html',
  styleUrls: ['./edit-issue.component.scss']
})
export class EditIssueComponent implements OnInit {
  issue: Issue;
  malfunctionGroupList: Array<MalfunctionGroup>;
  malfunctionSubGroupList: Array<MalfunctionSubgroup>;
  malfunctionList: Array<Malfunction>;

  malfunctionSubGroupFilteredList: Array<MalfunctionSubgroup>;
  malfunctionFilteredList: Array<Malfunction>;

  currentMalfunction: Malfunction;
  currentMalfunctionSubgroup: MalfunctionSubgroup;
  currentMalfunctionGroup: MalfunctionGroup;

  constructor(
    private issueService: IssueService,
    private toastr: ToastrService,
    private malfunctionGropService: MalfuncGroupService,
    private malfunctionSubGropService: MalfunSubgroupService,
    private malfunctionService: MalfuncService
    ) {}

  ngOnInit() {
    this.malfunctionGropService.getEntities().subscribe(items => this.malfunctionGroupList = items);
    this.malfunctionSubGropService.getEntities().subscribe(data => this.malfunctionSubGroupList = data);
    this.malfunctionService.getEntities().subscribe(data => this.malfunctionList = data);
    this.issue = this.issueService.selectedItem;
    this.currentMalfunction = this.issue.malfunction;
    this.currentMalfunctionSubgroup = this.currentMalfunction.malfunctionSubgroup;
    this.currentMalfunctionGroup = this.currentMalfunctionSubgroup.malfunctionGroup;
  }

  editIssue() {
    if (this.currentMalfunction && this.issue.malfunction.name !== this.currentMalfunction.name) {
      this.issue.malfunction = this.currentMalfunction;
    }
    this.issueService.updateEntity(this.issue)
      .subscribe(
          _ => this.toastr.success('Заявку редаговано', 'Успішно'),
          _ => this.toastr.error('Заявку не редаговано', 'Помилка')
        );
  }

  createHandler(): void {
    this.issueService.selectedItem = this.issue;
  }

  selectGroup(): void {
    this.currentMalfunctionSubgroup = null;
    this.currentMalfunction = null;
    if (this.currentMalfunctionGroup) {
      this.malfunctionSubGroupFilteredList = this.getByGroup(this.currentMalfunctionGroup);
    }
  }

  selectSubgroup(): void {
    this.currentMalfunction = null;
    if (this.currentMalfunctionSubgroup) {
      this.malfunctionFilteredList = this.getBySubgroup(this.currentMalfunctionSubgroup);
      console.dir(this.malfunctionFilteredList);
    }
  }

  selectMalfunction(): void {
    this.currentMalfunctionSubgroup.malfunctionGroup = this.currentMalfunctionGroup;
    this.currentMalfunction.malfunctionSubgroup = this.currentMalfunctionSubgroup;
  }

  private getByGroup(group: MalfunctionGroup): Array<MalfunctionSubgroup> {
    return this.malfunctionSubGroupList.filter(subgroup =>
      subgroup.malfunctionGroup.name === group.name
    );
  }

  private getBySubgroup(subgroup: MalfunctionSubgroup): Array<Malfunction> {
    return this.malfunctionList.filter(malfunc =>
      malfunc.malfunctionSubgroup.name === subgroup.name
    );
  }
}
