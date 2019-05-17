import { Component, OnInit } from '@angular/core';
import { MalfuncGroup } from 'src/app/modules/admin/models/malfuncGroup/malfunc-group';
import { MalfunSubgroup } from 'src/app/modules/admin/models/malfun-subgroup/malfun-subgroup';
import { Malfunction } from 'src/app/modules/admin/models/malfunc/malfunc';
import { MalfuncGroupService } from 'src/app/modules/admin/services/malfunc-group.service';
import { MalfunSubgroupService } from 'src/app/modules/admin/services/malfun-subgroup.service';
import { MalfuncService } from 'src/app/modules/admin/services/malfunc.service';

declare const $;

@Component({
  selector: 'app-global-malfunctions',
  templateUrl: './global-malfunctions.component.html',
  styleUrls: ['./global-malfunctions.component.scss']
})
export class GlobalMalfunctionsComponent implements OnInit {

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

    this.tableGroup.on( 'deselect',(e, dt, type, indexes )=>{
      this.unfilterMalfunctionSubGroup();
    });
    

    //subgroup

    this.malfuncSubgroupService.getEntities().subscribe(malfuncSubgroup => {
      this.malfuncSubgroups = malfuncSubgroup;
      this.tableSubGroup.rows.add(this.malfuncSubgroups);
      //this.tableSubGroup.draw();
    });
    this.tableSubGroup.on('select', (e, dt, type, index) => {
      const item = this.tableSubGroup.rows(index).data()[0];
      this.selectedMalfunctionSubGroup = item;
      this.filterMalfunctions();
    });

    this.tableSubGroup.on( 'deselect',(e, dt, type, indexes )=>{
      this.unfilterMalfunction();
    });

    //malfunctions
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
  //subgroup

  unfilterMalfunctionSubGroup(){
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

  //malfunctions
  unfilterMalfunction(){
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

}
