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
import {AlertService} from "../modals/alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<JWTResponse>;
  public currentUser: Observable<JWTResponse>;
  private currentUserInfoSubject: BehaviorSubject<UserDetails>;
  public currentInfoUser: Observable<UserDetails>;

  constructor(private http: HttpClient, handler: HttpBackend, private spinner: NgxSpinnerService,  private alertService: AlertService,) {
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
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `${error.error.message}`;
        }

        this.alertService
          .show({title: `Error`, description: errorMessage, style: 'error'});
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
          let message: string;
          if (error.error instanceof ErrorEvent) {
            message = `Error: ${error.error.message}`;
          } else {
            message = `${error.error.message}`;
          }

          this.alertService
            .show({title: `Error`, description: message, style: 'error'});
          return throwError(message);
        }),
        map(user => {
          this.alertService
            .show({title: `Success`, description: user.message, style: 'success'});
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
          let message: string;
          if (error.error instanceof ErrorEvent) {
            message = `Error: ${error.error.message}`;
          } else {
            message = `${error.error.message}`;
          }
          this.alertService
            .show({title: `Error`, description: message, style: 'error'});
          return throwError(message);
        }),
        map(user => {
          this.alertService
            .show({title: `Success`, description: user.message, style: 'success'});
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

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // get token from local storage or state management
    const decodeToken = this.getAccessToken();

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!decodeToken) {
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(this.currentUserInfoValue.userInfo.roles[0].name);
  }
}
