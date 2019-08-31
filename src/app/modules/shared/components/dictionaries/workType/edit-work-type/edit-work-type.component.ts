import { Component, OnInit, Input } from "@angular/core";
import { WorkType } from 'src/app/modules/shared/models/work-type';

@Component({
    selector: 'app-work-type-edit',
    templateUrl: './edit-work-type.component.html',
    styleUrls: ['./edit-work-type.component.scss']
  })
export class EditWorkTypeComponent implements OnInit {
    @Input() workType: WorkType;
    ngOnInit() {
    }
}
