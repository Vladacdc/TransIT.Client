import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastrService, private translate: TranslateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.toast.error(
            this.translate.instant('Core.Error.ConnectionError.Text'),
            this.translate.instant('Core.Error.ConnectionError.Title')
          );
        }
        if (error.status === 500) {
          this.toast.error(
            this.translate.instant('Core.Error.ServerError.Text'),
            this.translate.instant('Core.Error.ServerError.Title')
          );
        }
        return throwError(error);
      })
    );
  }
}
