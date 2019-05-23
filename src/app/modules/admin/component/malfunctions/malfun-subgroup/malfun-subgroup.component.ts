import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';

declare const $;

@Component({
  selector: 'app-malfun-subgroup',
  templateUrl: './malfun-subgroup.component.html',
  styleUrls: ['./malfun-subgroup.component.scss']
})
export class MalfunSubgroupComponent implements OnInit {
  private tableSubGroup: DataTables.Api;

  malfuncSubgroups: Array<MalfunctionSubgroup>;
  malfuncSubgroup: MalfunctionSubgroup;
  selectedMalfunctionSubGroup: MalfunctionSubgroup;

  constructor(private malfuncSubgroupService: MalfunctionSubgroupService, private router: Router) {}

  ngOnInit() {
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
    this.malfuncSubgroupService.getEntities().subscribe(malfuncSubgroup => {
      this.malfuncSubgroups = malfuncSubgroup;
      this.tableSubGroup.rows.add(this.malfuncSubgroups);
      this.tableSubGroup.draw();
    });
    this.tableSubGroup.on('select', (e, dt, type, index) => {
      const item = this.tableSubGroup.rows(index).data()[0];
      this.selectedMalfunctionSubGroup = item;
    });
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
    console.log('I can edit entity');
    this.malfuncSubgroups[
      this.malfuncSubgroups.findIndex(i => i.id === this.selectedMalfunctionSubGroup.id)
    ] = malfunctionSubGroup;
    this.tableSubGroup
      .row('.selected')
      .data(malfunctionSubGroup)
      .draw();
  }
}
