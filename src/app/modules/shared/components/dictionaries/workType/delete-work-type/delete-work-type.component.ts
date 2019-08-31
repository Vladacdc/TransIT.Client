import { Component, OnInit, Input } from "@angular/core";
import { WorkType } from 'src/app/modules/shared/models/work-type';

@Component({
    selector: 'app-work-type-delete',
    templateUrl: './delete-work-type.component.html',
    styleUrls: ['./delete-work-type.component.scss']
  })
export class DeleteWorkTypeComponent implements OnInit {
    @Input() workType: WorkType;
    ngOnInit() {
    }
}
