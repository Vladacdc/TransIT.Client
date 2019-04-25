import { Component, OnInit } from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { MalfunSubgroup } from '../../models/malfun-subgroup/malfun-subgroup';
import { Malfunction } from '../../models/malfunc/malfunc';
import { MalfuncGroupService } from '../../services/malfunc-group.service';
import { MalfunSubgroupService } from '../../services/malfun-subgroup.service';
import { MalfuncService } from '../../services/malfunc.service';

declare const $;

@Component({
  selector: 'app-malfunctions',
  templateUrl: './malfunctions.component.html',
  styleUrls: ['./malfunctions.component.scss']
})
export class MalfunctionsComponent implements OnInit {
  //group
  private tableGroup: DataTables.Api;

  selectedMalfunctionGroup: MalfuncGroup;
  malfuncGroups: Array<MalfuncGroup>;
  malfuncGroup: MalfuncGroup;

  //subgroup
  private tableSubGroup: DataTables.Api;

  malfuncSubgroups: Array<MalfunSubgroup>;
  malfuncSubgroup: MalfunSubgroup;
  selectedMalfunctionSubGroup: MalfunSubgroup;

  //malfunctions
  public malfunctions: Array<Malfunction>;
  private tableMalfunction: any;
  selectedMalfunction: Malfunction;

  constructor(
    private malfuncGroupService: MalfuncGroupService,
    private malfuncSubgroupService: MalfunSubgroupService,
    private malfuncService: MalfuncService
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

    //group
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

    //subgroup

    this.malfuncSubgroupService.getEntities().subscribe(malfuncSubgroup => {
      this.malfuncSubgroups = malfuncSubgroup;
      this.tableSubGroup.rows.add(this.malfuncSubgroups);
      this.tableSubGroup.draw();
    });
    this.tableSubGroup.on('select', (e, dt, type, index) => {
      const item = this.tableSubGroup.rows(index).data()[0];
      this.selectedMalfunctionSubGroup = item;
      this.filterMalfunctions();
    });

    //malfunctions
    this.malfuncService.getEntities().subscribe(selectedMalfunction => {
      this.malfunctions = selectedMalfunction;
      this.tableMalfunction.rows.add(this.malfunctions);
      this.tableMalfunction.draw();
    });
    this.tableMalfunction.on('select', (e, dt, type, indexes) => {
      console.log('23456');
      const item = this.tableMalfunction.rows(indexes).data()[0];
      this.selectedMalfunction = item;
    });
  }
  //group
  addMalfunctionGroup(malfuncGroup: MalfuncGroup) {
    this.malfuncGroups = [...this.malfuncGroups, malfuncGroup];
    this.tableGroup.row.add(malfuncGroup);
    console.log(this.malfuncGroups);
    this.tableGroup.draw();
  }

  deleteMalfunctionGroup(malfunctionGroup: MalfuncGroup) {
    this.malfuncGroups = this.malfuncGroups.filter(m => m !== malfunctionGroup);
    this.tableGroup
      .rows('.selected')
      .remove()
      .draw();
    // console.log(malfunctionGroup);
    console.log(this.malfuncGroups);
  }

  editMalfunctionGroup(malfunctionGroup: MalfuncGroup) {
    this.malfuncGroups[this.malfuncGroups.findIndex(i => i.id === this.selectedMalfunctionGroup.id)] = malfunctionGroup;
    this.tableGroup
      .row('.selected')
      .data(malfunctionGroup)
      .draw();
    console.log(this.malfuncGroups);
  }

  //subgroup

  filterMalfunctionSubGroup() {
    this.tableSubGroup.clear();
    this.tableSubGroup.rows.add(
      this.malfuncSubgroups.filter(x => {
        return x.malfunctionGroup !== null && x.malfunctionGroup.id === this.selectedMalfunctionGroup.id;
      })
    );
    this.tableSubGroup.draw();
  }

  addMalfunctionSubGroup(malfuncSubgroup: MalfunSubgroup) {
    this.malfuncSubgroups = [...this.malfuncSubgroups, malfuncSubgroup];
    this.tableSubGroup.row.add(malfuncSubgroup);
    this.tableSubGroup.draw();
  }

  deleteMalfunctionSubGroup(malfunctionSubGroup: MalfunSubgroup) {
    this.malfuncSubgroups = this.malfuncSubgroups.filter(x => x !== malfunctionSubGroup);
    this.tableSubGroup
      .rows('.selected')
      .remove()
      .draw();
  }
  editMalfunctionSubGroup(malfunctionSubGroup: MalfunSubgroup) {
    console.log('I can edit entity');
    this.malfuncSubgroups[
      this.malfuncSubgroups.findIndex(i => i.id === this.selectedMalfunctionSubGroup.id)
    ] = malfunctionSubGroup;
    this.tableSubGroup
      .row('.selected')
      .data(malfunctionSubGroup)
      .draw();
  }

  //malfunctions
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
    // console.log(malfunctionGroup);
    console.log(this.malfunctions);
  }

  addMalfunction(malfunction: Malfunction) {
    console.log('ttttttttttt1');
    this.malfunctions = [...this.malfunctions, malfunction];
    this.tableMalfunction.row.add(malfunction);
    this.tableMalfunction.draw();
  }

  //.............
}
