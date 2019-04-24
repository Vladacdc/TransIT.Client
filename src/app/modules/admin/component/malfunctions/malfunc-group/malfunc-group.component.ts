import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MalfuncGroup } from '../../../models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from '../../../services/malfunc-group.service';
import { Router } from '@angular/router';

declare const $;

@Component({
  selector: 'app-malfunc-group',
  templateUrl: './malfunc-group.component.html',
  styleUrls: ['./malfunc-group.component.scss']
})
export class MalfuncGroupComponent implements OnInit {
  private table: DataTables.Api;

  selectedMalfunctionGroup: MalfuncGroup;
  malfuncGroups: Array<MalfuncGroup>;
  malfuncGroup: MalfuncGroup;

  constructor(private malfuncGroupService: MalfuncGroupService, private router: Router) {}

  ngOnInit() {
    this.table = $('#group-table').DataTable({
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
    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      this.table.rows.add(this.malfuncGroups);
      this.table.draw();
    });

    this.table.on('select', (e, dt, type, index) => {
      const item = this.table.rows(index).data()[0];
      this.selectedMalfunctionGroup = item;
    });
  }

  addMalfunctionGroup(malfuncGroup: MalfuncGroup) {
    this.malfuncGroups = [...this.malfuncGroups, malfuncGroup];
    this.table.row.add(malfuncGroup);
    console.log(this.malfuncGroups);
    this.table.draw();
  }

  deleteMalfunction(malfunctionGroup: MalfuncGroup) {
    this.malfuncGroups = this.malfuncGroups.filter(m => m !== malfunctionGroup);
    this.table
      .rows('.selected')
      .remove()
      .draw();
    // console.log(malfunctionGroup);
    console.log(this.malfuncGroups);
  }

  editMalfunctionGroup(malfunctionGroup: MalfuncGroup) {
    this.malfuncGroups[this.malfuncGroups.findIndex(i => i.id === this.selectedMalfunctionGroup.id)] = malfunctionGroup;
    this.table
      .row('.selected')
      .data(malfunctionGroup)
      .draw();
      console.log(this.malfuncGroups);
  }
}
