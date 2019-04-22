import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { MalfuncGroup } from '../../models/malfuncGroup/malfunc-group';
import { MalfuncGroupService } from '../../services/malfunc-group.service';

@Component({
  selector: 'app-delete-malfunc-group',
  templateUrl: './delete-malfunc-group.component.html',
  styleUrls: ['./delete-malfunc-group.component.scss']
})
export class DeleteMalfuncGroupComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() malfuncGroup: MalfuncGroup;
  @Output() deleteUser = new EventEmitter<MalfuncGroup>();
  @Output() refresh_delete:EventEmitter<any>=new EventEmitter();
  private malfuncGroup_:MalfuncGroup;


  constructor(private service: MalfuncGroupService) {}

  ngOnInit() {}

  refreshClick(){
    this.refresh_delete.emit(this.malfuncGroup);
  }

  deleteMalgGroup() {
    console.log(this.malfuncGroup);
    this.closeDiv.nativeElement.click();
    this.malfuncGroup_=MalfuncGroup;
    this.service.deleteEntity(this.malfuncGroup.id).subscribe(data => {
    this.deleteUser.next(this.malfuncGroup_);
    });
  }
  
}
