import { Component, OnInit } from '@angular/core';
import { EntitiesDataSource } from '../../../data-sources/entities-data-sourse';
import { PartIn } from '../../../models/part-in';
import { PartsInService } from '../../../services/parts-in.service';

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

  dataSource: EntitiesDataSource<PartIn>;

  constructor(private partsInService: PartsInService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<PartIn>(this.partsInService);
  }
}
