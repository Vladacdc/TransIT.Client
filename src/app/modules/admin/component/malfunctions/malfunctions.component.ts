import { Component, OnInit } from '@angular/core';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';

declare const $;

@Component({
  selector: 'app-malfunctions',
  templateUrl: './malfunctions.component.html',
  styleUrls: ['./malfunctions.component.scss']
})
export class MalfunctionsComponent implements OnInit {
  // group
  private tableGroup: DataTables.Api;

  selectedMalfunctionGroup: MalfunctionGroup;
  malfuncGroups: Array<MalfunctionGroup>;
  malfuncGroup: MalfunctionGroup;

  // subgroup
  private tableSubGroup: DataTables.Api;

  malfuncSubgroups: Array<MalfunctionSubgroup>;
  malfuncSubgroup: MalfunctionSubgroup;
  selectedMalfunctionSubGroup: MalfunctionSubgroup;

  // malfunctions
  malfunctions: Array<Malfunction>;
  private tableMalfunction: any;
  selectedMalfunction: Malfunction;

  constructor(
    private malfuncGroupService: MalfunctionGroupService,
    private malfuncSubgroupService: MalfunctionSubgroupService,
    private malfuncService: MalfunctionService
  ) {}

  ngOnInit() {
    this.tableGroup = $('#group-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [{ data: 'id', bVisible: false }, { title: 'Група', data: 'name', defaultContent: '' }],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.tableSubGroup = $('#subgroup-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [{ data: 'id', bVisible: false }, { title: 'Підгрупа', data: 'name', defaultContent: '' }],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });
    this.tableMalfunction = $('#malfunc-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [{ data: 'id', bVisible: false }, { title: 'Помилки', data: 'name', defaultContent: '' }],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    });

    // group
    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      this.tableGroup.rows.add(this.malfuncGroups);
      this.tableGroup.draw();
    });

    this.tableGroup.on('select', (e, dt, type, index) => {
      const item = this.tableGroup.rows(index).data()[0];
      this.selectedMalfunctionGroup = item;
      this.filterMalfunctionSubGroup();
    });

    this.tableGroup.on('deselect', (e, dt, type, indexes) => {
      this.unfilterMalfunctionSubGroup();
    });

    // subgroup

    this.malfuncSubgroupService.getEntities().subscribe(malfuncSubgroup => {
      this.malfuncSubgroups = malfuncSubgroup;
      this.tableSubGroup.rows.add(this.malfuncSubgroups);
      // this.tableSubGroup.draw();
    });
    this.tableSubGroup.on('select', (e, dt, type, index) => {
      const item = this.tableSubGroup.rows(index).data()[0];
      this.selectedMalfunctionSubGroup = item;
      this.filterMalfunctions();
    });

    this.tableSubGroup.on('deselect', (e, dt, type, indexes) => {
      this.unfilterMalfunction();
    });

    // malfunctions
    this.malfuncService.getEntities().subscribe(selectedMalfunction => {
      this.malfunctions = selectedMalfunction;
      this.tableMalfunction.rows.add(this.malfunctions);
      // this.tableMalfunction.draw();
    });
    this.tableMalfunction.on('select', (e, dt, type, indexes) => {
      const item = this.tableMalfunction.rows(indexes).data()[0];
      this.selectedMalfunction = item;
    });
  }
  // group
  addMalfunctionGroup(malfuncGroup: MalfunctionGroup) {
    this.malfuncGroups = [...this.malfuncGroups, malfuncGroup];
    this.tableGroup.row.add(malfuncGroup);
    this.tableGroup.draw();
  }

  deleteMalfunctionGroup(malfunctionGroup: MalfunctionGroup) {
    this.malfuncGroups = this.malfuncGroups.filter(m => m !== malfunctionGroup);
    this.tableGroup
      .rows('.selected')
      .remove()
      .draw();
  }

  editMalfunctionGroup(malfunctionGroup: MalfunctionGroup) {
    this.malfuncGroups[this.malfuncGroups.findIndex(i => i.id === this.selectedMalfunctionGroup.id)] = malfunctionGroup;
    this.tableGroup
      .row('.selected')
      .data(malfunctionGroup)
      .draw();
  }

  // subgroup

  unfilterMalfunctionSubGroup() {
    this.tableSubGroup.clear();
    this.tableSubGroup.draw();
    this.tableMalfunction.clear();
    this.tableMalfunction.draw();
  }

  filterMalfunctionSubGroup() {
    this.tableSubGroup.clear();
    this.tableSubGroup.rows.add(
      this.malfuncSubgroups.filter(x => {
        return x.malfunctionGroup !== null && x.malfunctionGroup.id === this.selectedMalfunctionGroup.id;
      })
    );
    this.tableSubGroup.draw();
  }

  addMalfunctionSubGroup(malfuncSubgroup: MalfunctionSubgroup) {
    this.malfuncSubgroups = [...this.malfuncSubgroups, malfuncSubgroup];
    this.tableSubGroup.row.add(malfuncSubgroup);
    this.tableSubGroup.draw();
  }

  deleteMalfunctionSubGroup(malfunctionSubGroup: MalfunctionSubgroup) {
    this.malfuncSubgroups = this.malfuncSubgroups.filter(x => x !== malfunctionSubGroup);
    this.tableSubGroup
      .rows('.selected')
      .remove()
      .draw();
  }
  editMalfunctionSubGroup(malfunctionSubGroup: MalfunctionSubgroup) {
    this.malfuncSubgroups[
      this.malfuncSubgroups.findIndex(i => i.id === this.selectedMalfunctionSubGroup.id)
    ] = malfunctionSubGroup;
    this.tableSubGroup
      .row('.selected')
      .data(malfunctionSubGroup)
      .draw();
  }

  // malfunctions
  unfilterMalfunction() {
    this.tableMalfunction.clear();
    this.tableMalfunction.draw();
  }

  filterMalfunctions() {
    this.tableMalfunction.clear();
    this.tableMalfunction.rows.add(
      this.malfunctions.filter(x => {
        return x.malfunctionSubgroup !== null && x.malfunctionSubgroup.id === this.selectedMalfunctionSubGroup.id;
      })
    );
    this.tableMalfunction.draw();
  }

  deleteMalfunction(malfunction: Malfunction) {
    this.malfunctions = this.malfunctions.filter(m => m !== malfunction);
    this.tableMalfunction
      .rows('.selected')
      .remove()
      .draw();
  }

  addMalfunction(malfunction: Malfunction) {
    this.malfunctions = [...this.malfunctions, malfunction];
    this.tableMalfunction.row.add(malfunction);
    this.tableMalfunction.draw();
  }

  editMalfunction(malfunction: Malfunction) {
    this.malfunctions[this.malfunctions.findIndex(i => i.id === this.selectedMalfunction.id)] = malfunction;
    this.tableMalfunction
      .row('.selected')
      .data(malfunction)
      .draw();
  }
}
