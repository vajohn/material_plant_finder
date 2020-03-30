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
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {LoginService} from './login.service';


@Injectable()
export class HttpCustomInterceptor implements HttpCustomInterceptor {


  constructor(
    private ls: LoaderService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
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
          this.toast.error(error?.error?.message, `${error?.error?.responseBody}`);
          return throwError(error?.error?.message);
        }),
        finalize(() => this.spinner.hide())
      );
  }
}
