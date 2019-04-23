import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MalfunSubgroup } from '../../../models/malfun-subgroup/malfun-subgroup';
import { MalfuncGroup } from '../../../models/malfuncGroup/malfunc-group';
import { MalfunSubgroupService } from '../../../services/malfun-subgroup.service';
import { MalfuncGroupService } from '../../../services/malfunc-group.service';

@Component({
  selector: 'app-malfun-subgroup',
  templateUrl: './malfun-subgroup.component.html',
  styleUrls: ['./malfun-subgroup.component.scss']
})
export class MalfunSubgroupComponent implements OnInit {
  malfunSubgroups: MalfunSubgroup[] = [];
  malfuncGroupList: MalfuncGroup[] = [];
  datatable: any;
  malfunSubGroup: MalfunSubgroup;

  constructor(private serviceMalfuncSubGroup: MalfunSubgroupService, private serviceMalfuncGroup: MalfuncGroupService,
    private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.serviceMalfuncGroup.getEntities().subscribe(group => (this.malfuncGroupList = group));
    this.serviceMalfuncSubGroup.getEntities().subscribe(subGroups => {
      this.malfunSubgroups = subGroups;
      this.chRef.detectChanges();
      const table: any = $('#subgroup');
      this.datatable = table.DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
        },
        scrollX: true
      });
    });
  }

  updateSubGroup(malfunSubGroup: MalfunSubgroup) {
    const index = this.malfunSubgroups.findIndex(u => u.id === malfunSubGroup.id);
    this.malfunSubgroups[index] = malfunSubGroup;
    this.malfunSubgroups = [...this.malfunSubgroups];
  }

  addSubGroup(malfunSubGroup: MalfunSubgroup) {
    this.malfunSubgroups = [...this.malfunSubgroups, malfunSubGroup];
  }

  deleteSubGroup(malfunSubGroup: MalfunSubgroup) {
    this.malfunSubgroups = this.malfunSubgroups.filter(u => u.id !== malfunSubGroup.id);
  }

  selectSubGroup(malfuncSubGroupItem: MalfunSubgroup) {
    this.malfunSubGroup = malfuncSubGroupItem;
    console.log("aaaaaaaaa");
    console.log(this.malfunSubGroup);
  }
}
