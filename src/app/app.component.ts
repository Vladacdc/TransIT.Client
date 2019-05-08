import { Component, OnInit } from '@angular/core';
import { TokenStore } from './modules/core/helpers/TokenStore';
import { AuthenticationService } from './modules/core/services/authentication.service';
import { environment } from '../environments/environment';

declare const $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private isInProgress: boolean;

  constructor(
    private tokenStore: TokenStore,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    $.ajaxSetup({
      beforeSend: (jqXHR, settings) => {
        if (settings.url.includes(environment.apiUrl)) {
          jqXHR.setRequestHeader(
            'Authorization',
            `Bearer ${this.tokenStore.getToken().accessToken}`
          );
        }
      },
      statusCode: {
        401: () => {
          if (!this.isInProgress) {
            this.isInProgress = true;
            this.authenticationService
              .refreshAccessToken()
              .subscribe(() =>
                this.isInProgress = false
              );
          }
        }
      }
    });
  }
}
