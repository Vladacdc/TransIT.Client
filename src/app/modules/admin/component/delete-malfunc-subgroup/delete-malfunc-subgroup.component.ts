import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MalfunSubgroup } from '../../models/malfun-subgroup/malfun-subgroup';
import { MalfunSubgroupService } from '../../services/malfun-subgroup.service';

@Component({
  selector: 'app-delete-malfunc-subgroup',
  templateUrl: './delete-malfunc-subgroup.component.html',
  styleUrls: ['./delete-malfunc-subgroup.component.scss']
})
export class DeleteMalfuncSubgroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() malfunctionSubGroup: MalfunSubgroup;
  @Output() deleteMalfuncSubGroup = new EventEmitter<MalfunSubgroup>();
  constructor(private serviceMalfuncSubGroup: MalfunSubgroupService) {}

  ngOnInit() {}

  delete() {
    this.closeDiv.nativeElement.click();
    this.serviceMalfuncSubGroup.deleteEntity(this.malfunctionSubGroup.id).subscribe(() => {
      this.deleteMalfuncSubGroup.next(this.malfunctionSubGroup);
    });
  }
}
