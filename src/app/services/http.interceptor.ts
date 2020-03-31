import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse, HttpResponse, HttpHeaders,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {LoaderService} from './loader.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {environment} from '../../environments/environment';
import {LoginService} from './login.service';
import {AlertService} from "../modals/alert/alert.service";


@Injectable()
export class HttpCustomInterceptor implements HttpCustomInterceptor {


  constructor(
    private ls: LoaderService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private loginService: LoginService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.loginService.getAccessToken()
      }),
      url: environment.baseUrl + request.url
    });
    return next.handle(authReq)
      .pipe(
        map((data: HttpResponse<any>) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          this.alertService
            .show({title: `Error ${error?.error?.statusCode}`, description: error?.error?.message, style: 'error'});
          // this.toast(error?.error?.message, `${error?.error?.responseBody}`);
          return throwError(error?.error?.message);
        }),
        finalize(() => this.spinner.hide())
      );
  }
}
