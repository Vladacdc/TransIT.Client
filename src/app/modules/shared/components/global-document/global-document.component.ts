import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-document',
  templateUrl: './global-document.component.html',
  styleUrls: ['./global-document.component.scss']
})
export class GlobalDocumentComponent implements OnInit {
  public isVisible: boolean = true;

  constructor(private router: Router) {}
  _url = this.router.url.substring(1, this.router.url.length - 1);

  ngOnInit() {
    this._url = this._url.substring(0, this._url.indexOf('/'));
    this.isVisibleCheck();
  }

  isVisibleCheck() {
    if (this._url === 'admin' || this._url === 'engineer') this.isVisible = true;
    else this.isVisible = false;
  }
}
