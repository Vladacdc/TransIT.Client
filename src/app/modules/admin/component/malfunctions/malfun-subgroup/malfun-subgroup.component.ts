import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-malfun-subgroup',
  templateUrl: './malfun-subgroup.component.html',
  styleUrls: ['./malfun-subgroup.component.scss']
})
export class MalfunSubgroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#subgroup').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      },
      scrollX: true
    });
  }

}
