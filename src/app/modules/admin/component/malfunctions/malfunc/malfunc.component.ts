import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-malfunc',
  templateUrl: './malfunc.component.html',
  styleUrls: ['./malfunc.component.scss']
})
export class MalfuncComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#malfunc').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      },
      scrollX: true
    });
  }

}
