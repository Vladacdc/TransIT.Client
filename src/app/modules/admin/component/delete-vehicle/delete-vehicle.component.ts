import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Vehicle } from 'src/app/modules/shared/models/vehicle';
import { VehicleService } from 'src/app/modules/shared/services/vehicle.service';

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
  styleUrls: ['./delete-vehicle.component.scss']
})
export class DeleteVehicleComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() vehicle: Vehicle;
  @Output() deleteVehicle = new EventEmitter<Vehicle>();

  constructor(private service: VehicleService, private toast: ToastrService) {}

  ngOnInit() {}

  delete() {
    this.closeDiv.nativeElement.click();
    this.service
      .deleteEntity(this.vehicle.id)
      .subscribe(
        data => this.deleteVehicle.next(this.vehicle),
        _ => this.toast.error('Не вдалось видалити транспорт', 'Помилка видалення транспорту')
      );
  }
}
