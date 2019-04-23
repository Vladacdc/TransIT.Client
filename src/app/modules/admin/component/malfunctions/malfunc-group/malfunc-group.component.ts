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
  public malfuncGroup: Array<MalfuncGroup>;
  private table: any;

  constructor(
    private malfuncGroupService:MalfuncGroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.table = $('#group-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Група', data: 'name', defaultContent: '' }
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
        }
    })
    this.malfuncGroupService.getEntities().subscribe(malfuncGroup => {
      this.malfuncGroup = malfuncGroup;
      this.table.rows.add(this.malfuncGroup);
      this.table.draw();
    });
    this.table.on('select', (e, dt, type, indexes) => {
      console.log("23456");
      const item = this.table.rows( indexes ).data()[0];
      this.router.navigate(['/admin/users', item]);
    });
    console.dir(this.table);

  }
}