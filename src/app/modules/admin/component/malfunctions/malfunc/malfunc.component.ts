import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MalfuncService } from '../../../services/malfunc.service';
import { Malfunction } from '../../../models/malfunc/malfunc';


declare const $;

@Component({
  selector: 'app-malfunc',
  templateUrl: './malfunc.component.html',
  styleUrls: ['./malfunc.component.scss']
})
export class MalfuncComponent implements OnInit {
  public malfunction: Array<Malfunction>;
  private tableMalfunction: any;

  constructor(
    private malfuncService: MalfuncService,
    private router: Router
  ) {}

  ngOnInit() {
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
    this.malfuncService.getEntities().subscribe(selectedMalfunction => {
      this.malfunction = selectedMalfunction;
      this.tableMalfunction.rows.add(this.malfunction);
      this.tableMalfunction.draw();
    });
    this.tableMalfunction.on('select', (e, dt, type, indexes) => {
      console.log('23456');
      const item = this.tableMalfunction.rows(indexes).data()[0];
      this.router.navigate(['/admin/users', item]);
    });
    console.dir(this.tableMalfunction);
  }
}
