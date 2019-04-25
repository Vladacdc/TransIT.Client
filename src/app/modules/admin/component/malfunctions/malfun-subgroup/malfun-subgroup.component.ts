import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MalfunSubgroup } from '../../../models/malfun-subgroup/malfun-subgroup';
import { MalfunSubgroupService } from '../../../services/malfun-subgroup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MalfuncGroup } from '../../../models/malfuncGroup/malfunc-group';


declare const $;

@Component({
  selector: 'app-malfun-subgroup',
  templateUrl: './malfun-subgroup.component.html',
  styleUrls: ['./malfun-subgroup.component.scss']
})
export class MalfunSubgroupComponent implements OnInit {
  private tableSubGroup: DataTables.Api;

  malfuncSubgroups: Array<MalfunSubgroup>;
  malfuncSubgroup: MalfunSubgroup;
  selectedMalfunctionSubGroup: MalfunSubgroup;

  constructor(
    private malfuncSubgroupService: MalfunSubgroupService,
    private router: Router
  ) {}

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
}
