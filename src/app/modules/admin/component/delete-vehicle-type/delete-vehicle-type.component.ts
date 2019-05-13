import { Component, OnInit, EventEmitter, ViewChild, Input, Output, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VehicleType } from '../../models/vehicleType/vehicle-type';
import { VehicleTypeService } from '../../services/vehicle-type.service';

@Component({
  selector: 'app-delete-vehicle-type',
  templateUrl: './delete-vehicle-type.component.html',
  styleUrls: ['./delete-vehicle-type.component.scss']
})
export class DeleteVehicleTypeComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() vehicleType: VehicleType;
  @Output() deleteVehicleType = new EventEmitter<VehicleType>();

  constructor(private service: VehicleTypeService, private toast: ToastrService) { }
 
  ngOnInit() {
  }

  delete() {
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.vehicleType.id).subscribe(data => 
      this.deleteVehicleType.next(this.vehicleType),
      _ => this.toast.error('Не вдалось видалити тип транспорту', 'Помилка видалення типу транспорту')
    );
  }
}
