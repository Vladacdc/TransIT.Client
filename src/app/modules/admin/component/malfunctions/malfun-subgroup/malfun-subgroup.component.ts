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
  public malfuncSubgroups: Array<MalfunSubgroup>;
  private table: any;

  constructor(
    private malfuncSubroupService:MalfunSubgroupService,
    private router: Router
  ) {}

  ngOnInit() {
    

    this.table = $('#subgroup-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Підгрупа', data: 'name', defaultContent: '' }
      ],
      paging: true,
      language: {
      url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      }
    })
    this.malfuncSubroupService.getEntities().subscribe(malfuncSubgroups => {
      this.malfuncSubgroups = malfuncSubgroups;
      this.table.rows.add(this.malfuncSubgroups);
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

