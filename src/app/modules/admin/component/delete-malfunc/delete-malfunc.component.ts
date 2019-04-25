import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Malfunction } from '../../models/malfunc/malfunc';
import { MalfuncService } from '../../services/malfunc.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-malfunc',
  templateUrl: './delete-malfunc.component.html',
  styleUrls: ['./delete-malfunc.component.scss']
})
export class DeleteMalfuncComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;
  @Input() malfunction: Malfunction;
  @Output() deleteMalfunction = new EventEmitter<Malfunction>();

  constructor(private service: MalfuncService, private toast: ToastrService) {}

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
