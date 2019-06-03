import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Location } from 'src/app/modules/shared/models/location';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html',
  styleUrls: ['./delete-location.component.scss']
})
export class DeleteLocationComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() location: Location;
  @Output() deleteLocation = new EventEmitter<Location>();
  constructor(private service: LocationService, private toast: ToastrService) { }

  ngOnInit() {
  }

  delete() {
    this.closeDiv.nativeElement.click();
    this.service
      .deleteEntity(this.location.id)
      .subscribe(
        data => this.deleteLocation.next(this.location),
        _ => this.toast.error('Не вдалось видалити місцезнаходження', 'Помилка видалення місцезнаходження')
      );
  }
}
