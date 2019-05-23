import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MalfunctionSubgroup } from 'src/app/modules/shared/models/malfunction-subgroup';
import { MalfunctionSubgroupService } from 'src/app/modules/shared/services/malfunction-subgroup.service';

@Component({
  selector: 'app-delete-malfunc-subgroup',
  templateUrl: './delete-malfunc-subgroup.component.html',
  styleUrls: ['./delete-malfunc-subgroup.component.scss']
})
export class DeleteMalfuncSubgroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() malfunctionSubGroup: MalfunctionSubgroup;
  @Output() deleteMalfuncSubGroup = new EventEmitter<MalfunctionSubgroup>();
  constructor(private serviceMalfuncSubGroup: MalfunctionSubgroupService, private toast: ToastrService) {}

  ngOnInit() {}

  delete() {
    this.closeDiv.nativeElement.click();
    this.serviceMalfuncSubGroup.deleteEntity(this.malfunctionSubGroup.id).subscribe(
      () => {
        this.deleteMalfuncSubGroup.next(this.malfunctionSubGroup);
      },
      error => this.toast.error('Помилка', 'Існує заявка з даною підгрупою')
    );
  }
}
