import { Component, OnInit, EventEmitter, ViewChild, Input, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('close') closeDiv: ElementRef;

  @Input() message: string;

  @Output() isDeletable = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

delete(){
  this.isDeletable.emit(true);
  this.closeDiv.nativeElement.click();
}

}
