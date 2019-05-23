import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';

declare const $;

@Component({
  selector: 'app-malfunc-group',
  templateUrl: './malfunc-group.component.html',
  styleUrls: ['./malfunc-group.component.scss']
})
export class MalfuncGroupComponent implements OnInit {
  private tableGroup: DataTables.Api;

  selectedMalfunctionGroup: MalfunctionGroup;
  malfuncGroups: Array<MalfunctionGroup>;
  malfuncGroup: MalfunctionGroup;

  constructor(private malfuncGroupService: MalfunctionGroupService, private router: Router) {}

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
    this.malfuncGroupService.getEntities().subscribe(malfuncGroups => {
      this.malfuncGroups = malfuncGroups;
      this.tableGroup.rows.add(this.malfuncGroups);
      this.tableGroup.draw();
    });

    this.tableGroup.on('select', (e, dt, type, index) => {
      const item = this.tableGroup.rows(index).data()[0];
      this.selectedMalfunctionGroup = item;
    });
  }

  addMalfunctionGroup(malfuncGroup: MalfunctionGroup) {
    this.malfuncGroups = [...this.malfuncGroups, malfuncGroup];
    this.tableGroup.row.add(malfuncGroup);
    console.log(this.malfuncGroups);
    this.tableGroup.draw();
  }

  deleteMalfunctionGroup(malfunctionGroup: MalfunctionGroup) {
    this.malfuncGroups = this.malfuncGroups.filter(m => m !== malfunctionGroup);
    this.tableGroup
      .rows('.selected')
      .remove()
      .draw();
    // console.log(malfunctionGroup);
    console.log(this.malfuncGroups);
  }

  editMalfunctionGroup(malfunctionGroup: MalfunctionGroup) {
    this.malfuncGroups[this.malfuncGroups.findIndex(i => i.id === this.selectedMalfunctionGroup.id)] = malfunctionGroup;
    this.tableGroup
      .row('.selected')
      .data(malfunctionGroup)
      .draw();
    console.log(this.malfuncGroups);
  }
}
