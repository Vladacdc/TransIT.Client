import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MalfunctionGroup } from 'src/app/modules/shared/models/malfunction-group';
import { MalfunctionGroupService } from 'src/app/modules/shared/services/malfunction-group.service';

@Component({
  selector: 'app-delete-malfunc-group',
  templateUrl: './delete-malfunc-group.component.html',
  styleUrls: ['./delete-malfunc-group.component.scss']
})
export class DeleteMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() malfunctionGroup: MalfunctionGroup;
  @Output() deleteMalfunctionGroup = new EventEmitter<MalfunctionGroup>();

  constructor(private service: MalfunctionGroupService, private toast: ToastrService) {}

  ngOnInit() {}

  deleteMalfuncGroup() {
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.malfunctionGroup.id).subscribe(
      () => {
        this.deleteMalfunctionGroup.next(this.malfunctionGroup);
      },
      error => this.toast.error('Помилка', 'Існує заявка з даною групою помилки')
    );
  }
}
