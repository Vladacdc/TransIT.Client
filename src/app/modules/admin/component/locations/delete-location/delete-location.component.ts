import { Component, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Location } from 'src/app/modules/shared/models/location';
import { LocationService } from 'src/app/modules/shared/services/location.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html',
  styleUrls: ['./delete-location.component.scss']
})
export class DeleteLocationComponent{
  @ViewChild('close') closeDiv: ElementRef;
  @Input() location: Location;
  @Output() deleteLocation = new EventEmitter<Location>();
  constructor(private service: LocationService, 
    private toast: ToastrService,
    private translate : TranslateService
    ) { }

  delete() {
    this.closeDiv.nativeElement.click();
    this.service
      .deleteEntity(this.location.id)
      .subscribe(
        data => {
          this.deleteLocation.next(this.location);
          this.toast.success('', this.translate.instant('Admin.Location.Deleted'));
        },
        _ => this.toast.error(this.translate.instant("Admin.Location.NotDeleted")), this.translate.instant("Admin.Location.DeleteError")
      );
  }
}
