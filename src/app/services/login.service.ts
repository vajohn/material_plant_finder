import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {JWTResponse, LoginRequest, UserDetails} from '../models/authentication';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {catchError, finalize, first, map} from 'rxjs/operators';
import {StorageCase} from '../utilities/constants';
import {NgxSpinnerService} from 'ngx-spinner';
import {UsersResponse} from '../models/users';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<JWTResponse>;
  public currentUser: Observable<JWTResponse>;
  private currentUserInfoSubject: BehaviorSubject<UserDetails>;
  public currentInfoUser: Observable<UserDetails>;

  constructor(private http: HttpClient, handler: HttpBackend, private spinner: NgxSpinnerService, private toast: ToastrService) {
    this.http = new HttpClient(handler);
    this.currentUserSubject = new BehaviorSubject<JWTResponse>(this.getDecodedAccessToken());
    this.currentUserInfoSubject = new BehaviorSubject<UserDetails>(this.getDecodedUserInfo());
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentInfoUser = this.currentUserInfoSubject.asObservable();
  }

  login(data: LoginRequest): Observable<DefaultResponse> {
    this.spinner.show();
    return this.http.post<DefaultResponse>(`${environment.baseUrl}users/login`, data, {observe: 'response'}).pipe(
      first(),
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
      map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const result: UsersResponse = user.body as UsersResponse;
        sessionStorage.setItem(StorageCase.token, user.headers.get('authorization'));
        sessionStorage.setItem(StorageCase.currentUser,
          JSON.stringify({
            orgId: result.responseBody.organization.id,
            branchId: result.responseBody.branch.id,
            userInfo: result.responseBody
          }));
        this.currentUserSubject.next(this.getDecodedAccessToken());
        this.currentUserInfoSubject.next(this.getDecodedUserInfo());
        return user.body;
      }),
      finalize(() => this.spinner.hide())
    );
  }

  forgotPasswordRequest(value: any): Observable<DefaultResponse> {
    this.spinner.show();
    return this.http.post<DefaultResponse>(`${environment.baseUrl}users/request-password-reset`, value)
      .pipe(
        first(),
        catchError((error: HttpErrorResponse) => {
          let errorCode: string;
          let message: string;
          if (error.error instanceof ErrorEvent) {
            message = `Error: ${error.error.message}`;
          } else {
            message = `${error.error.message}\nMessage: Failed to connect please try again later`;
            errorCode = `Error Code: ${error.status}`;
          }
          this.toast.error(message, `${errorCode}`);
          return throwError(message);
        }),
        map(user => {
          this.toast.success('', `${user.message}`);
          return user;
        }),
        finalize(() => this.spinner.hide())
      );
  }

  passwordResetRequest(value: any): Observable<DefaultResponse> {
    this.spinner.show();
    return this.http.post<DefaultResponse>(`${environment.baseUrl}users/process-password-reset`, value)
      .pipe(
        first(),
        catchError((error: HttpErrorResponse) => {
          let errorCode: string;
          let message: string;
          if (error.error instanceof ErrorEvent) {
            message = `Error: ${error.error.message}`;
          } else {
            message = `${error.error.message}\nMessage: Failed to connect please try again later`;
            errorCode = `Error Code: ${error.status}`;
          }
          this.toast.error(message, `${errorCode}`);
          return throwError(message);
        }),
        map(user => {
          this.toast.success('', `${user.message}`);
          return user;
        }),
        finalize(() => this.spinner.hide())
      );
  }

  getDecodedAccessToken(): JWTResponse {
    try {
      return jwt_decode(sessionStorage.getItem(StorageCase.token));
    } catch (Error) {
      return null;
    }
  }

  getAccessToken() {
    try {
      return sessionStorage.getItem(StorageCase.token);
    } catch (Error) {
      return null;
    }
  }

  public getDecodedUserInfo(): UserDetails {
    try {
      return JSON.parse(sessionStorage.getItem(StorageCase.currentUser));
    } catch (Error) {
      return null;
    }
  }

  public get currentUserValue(): JWTResponse {
    return this.currentUserSubject.value;
  }

  public get currentUserInfoValue(): UserDetails {
    return this.currentUserInfoSubject.value;
  }

  logout() {
    this.currentUserInfoSubject.next(null);
    this.currentUserSubject.next(null);
    sessionStorage.clear();
  }
}
