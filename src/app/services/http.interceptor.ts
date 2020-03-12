import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse, HttpResponse, HttpHeaders,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {retry, catchError, finalize, delay, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {LoaderService} from './loader.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';


@Injectable()
export class HttpCustomInterceptor implements HttpCustomInterceptor {


  constructor(private ls: LoaderService,
              private spinner: NgxSpinnerService,
              private toast: ToastrService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // tslint:disable-next-line:max-line-length
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwODIwMjA5MzZRNzUiLCJleHAiOjE1ODQyNjE2Njl9.J5Ua75EDw3_qVSgCDAUIG8vtm4m68iHubhKUlRzsdy-yZatreXiC9TbslGrAPfJBzg6Zt4yg2zJ4NrwtY_MyFg'
      }),
      url: environment.baseUrl + request.url
    });
    return next.handle(authReq)
      .pipe(
        map((data: HttpResponse<any>) => {
          return data;
        }),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage: string;
          let errorCode: string;
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `${error.error.message}\nMessage: Failed to connect please try again later`;
            errorCode = `Error Code: ${error.status}`;
          }
          this.toast.error(errorMessage, `${errorCode}`);
          return throwError(errorMessage);
        }),
        finalize(() => this.spinner.hide())
      );
  }
}
