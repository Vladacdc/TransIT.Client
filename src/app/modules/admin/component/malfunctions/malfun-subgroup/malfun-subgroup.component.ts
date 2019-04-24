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

  private table: DataTables.Api;

  malfuncSubgroups: Array<MalfunSubgroup>;
  malfuncSubgroup: MalfunSubgroup;
  selectedMalfunctionSubGroup: MalfunSubgroup;

  constructor(private malfuncSubroupService: MalfunSubgroupService, private router: Router) {}

  ngOnInit() {
    

    this.table = $('#subgroup-table').DataTable({
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
    this.malfuncSubroupService.getEntities().subscribe(malfuncSubgroup => {
      this.malfuncSubgroups = malfuncSubgroup;
      this.table.rows.add(this.malfuncSubgroups);
      this.table.draw();
    });
    this.table.on('select', (e, dt, type, index) => {
      const item = this.table.rows(index).data()[0];
      this.selectedMalfunctionSubGroup = item;
      console.log('rerererer');
      console.log(this.selectedMalfunctionSubGroup);
    });
  }

  addMalfunctionSubGroup(malfuncSubgroup: MalfunSubgroup) {
    this.malfuncSubgroups = [...this.malfuncSubgroups, malfuncSubgroup];
    this.table.row.add(malfuncSubgroup);
    this.table.draw();
  }

  deleteMalfunctionSubGroup(malfunctionSubGroup: MalfunSubgroup) {
    this.malfuncSubgroups = this.malfuncSubgroups.filter(x => x !== malfunctionSubGroup);
    this.table
      .rows('.selected')
      .remove()
      .draw();
  }
  editMalfunctionSubGroup(malfunctionSubGroup: MalfunSubgroup) {
    this.malfuncSubgroups[
      this.malfuncSubgroups.findIndex(i => i.id === this.selectedMalfunctionSubGroup.id)
    ] = malfunctionSubGroup;
    this.table
      .row('.selected')
      .data(malfunctionSubGroup)
      .draw();
  }
}
