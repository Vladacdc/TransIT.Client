import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Malfunction } from 'src/app/modules/shared/models/malfunction';
import { MalfunctionService } from 'src/app/modules/shared/services/malfunction.service';

@Component({
  selector: 'app-delete-malfunc',
  templateUrl: './delete-malfunc.component.html',
  styleUrls: ['./delete-malfunc.component.scss']
})
export class DeleteMalfuncComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() malfunction: Malfunction;
  @Output() deleteMalfunction = new EventEmitter<Malfunction>();

  constructor(private service: MalfunctionService, private toast: ToastrService) {}

  ngOnInit() {}

  deleteMalfunc() {
    this.closeDiv.nativeElement.click();
    this.service.deleteEntity(this.malfunction.id).subscribe(
      () => {
        this.deleteMalfunction.next(this.malfunction);
      },
      error => this.toast.error('Помилка', 'Існує заявка з даною помилкою')
    );
  }
}
