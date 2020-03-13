import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {JWTResponse, LoginRequest, UserDetails} from '../models/authentication';
import {BehaviorSubject, Observable} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {environment} from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import {finalize, first, map} from 'rxjs/operators';
import {StorageCase} from '../utilities/constants';
import {NgxSpinnerService} from 'ngx-spinner';
import {UsersListResponseBody, UsersResponse} from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<JWTResponse>;
  public currentUser: Observable<JWTResponse>;
  private currentUserInfoSubject: BehaviorSubject<UserDetails>;
  public currentInfoUser: Observable<UserDetails>;

  constructor(private http: HttpClient, handler: HttpBackend, private spinner: NgxSpinnerService) {
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
      map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const result: UsersResponse = user.body as UsersResponse;
        sessionStorage.setItem(StorageCase.token, user.headers.get('authorization'));
        sessionStorage.setItem(StorageCase.currentUser,
          JSON.stringify({orgId: result.responseBody.organization.id, branchId: result.responseBody.branch.id }));
        this.currentUserSubject.next(this.getDecodedAccessToken());
        this.currentUserInfoSubject.next(this.getDecodedUserInfo());
        return user.body;
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
}