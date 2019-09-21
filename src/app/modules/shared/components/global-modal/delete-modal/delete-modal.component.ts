import { Component, OnInit, EventEmitter, ViewChild, Input, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;

  @Input() message: string;

  
  @Output() IsDeletable = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }


delete(){
  this.IsDeletable.emit(true);
  this.closeDiv.nativeElement.click();
}

}
