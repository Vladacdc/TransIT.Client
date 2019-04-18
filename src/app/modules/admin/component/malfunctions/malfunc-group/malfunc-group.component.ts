import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-malfunc-group',
  templateUrl: './malfunc-group.component.html',
  styleUrls: ['./malfunc-group.component.scss']
})
export class MalfuncGroupComponent implements OnInit {
  heroes = [
    new Hero(1, 'Windstorm','Asap'),
    new Hero(13, 'Bombasto','Arap'),
    new Hero(15, 'Magneta','Arack'),
    new Hero(20, 'Tornado','Atar')
  ];
  constructor() { }

  ngOnInit() {
    $('#group').DataTable({
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Ukrainian.json'
      },
      ajax: "../../assets/data.json",
      columns: [
        { "data": "id" },
        { "data": "name" },
        { "data": "position" },
      ]
    });
  }

}
