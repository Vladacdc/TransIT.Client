import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
  public isVisible: boolean = true;

  constructor(private router: Router) {}
  _url = this.router.url.substring(1, this.router.url.length - 1);

  ngOnInit() {
    this._url = this._url.substring(0, this._url.indexOf('/'));
    this.isVisibleCheck();
  }

  isVisibleCheck() {
    if (this._url === 'admin') this.isVisible = true;
    else this.isVisible = false;
  }
}
