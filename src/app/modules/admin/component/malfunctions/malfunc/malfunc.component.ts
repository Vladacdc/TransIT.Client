import { Component, OnInit } from '@angular/core';
import { Malfunc } from '../../../models/malfunc/malfunc';
import { Router } from '@angular/router';
import { MalfuncService } from '../../../services/malfunc.service';

declare const $;

@Component({
  selector: 'app-malfunc',
  templateUrl: './malfunc.component.html',
  styleUrls: ['./malfunc.component.scss']
})
export class MalfuncComponent implements OnInit {
  public malfunc: Array<Malfunc>;
  private table: any;

  constructor(
    private malfuncService:MalfuncService,
    private router: Router
  ) {}

  ngOnInit() {
    this.table = $('#malfunc-table').DataTable({
      responsive: true,
      select: {
        style: 'single'
      },
      columns: [
        { data: 'id', bVisible: false },
        { title: 'Помилки', data: 'name', defaultContent: '' }
      ],
      paging: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
        }
    })
    this.malfuncService.getEntities().subscribe(malfunc => {
      this.malfunc = malfunc;
      this.table.rows.add(this.malfunc);
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