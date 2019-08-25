import { Component, OnInit } from '@angular/core';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { PartIn } from '../../../models/part-in';
import { PartsInService } from '../../../services/parts-in.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-parts-in',
  templateUrl: './parts-in.component.html',
  styleUrls: ['./parts-in.component.scss']
})
export class PartsInComponent implements OnInit {

  columnDefinitions: string[] = [
    'price',
    'amount',
    'batch',
    'partName',
    'arrivalDate',
    'unitName',
    'currencyName',
  ];
  columnNames: string[] = [
    'Ціна',
    'Кількість',
    'Номер партії',
    'Запчастина',
    'Дата прибуття',
    'Одиниці виміру',
    'Валюта',
  ];

  dataSource: EntitiesDataSource<PartIn>;

  constructor(private partsInService: PartsInService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<PartIn>(this.partsInService);
  }
}
