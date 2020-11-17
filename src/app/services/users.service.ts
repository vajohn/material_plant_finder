import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApproveUserResponse, UsersListResponse} from '../models/users';
import {DefaultResponse} from "../models/default";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<UsersListResponse> {
    return this.http.get<UsersListResponse>(`users/`);
  }

  getUsersByOrg(orgId: number): Observable<UsersListResponse> {
    return this.http.get<UsersListResponse>(`users/by-organization/${orgId}`);
  }

  approveUser(userId, approverId, userData): Observable<ApproveUserResponse> {
    return this.http.put<ApproveUserResponse>(`users/approve-user/${userId}/approved-by/${approverId}`, {});
  }

  confirmPassword(data, userId: number): Observable<boolean> {
    return this.http.post<DefaultResponse>(`users/confirm-password/${userId}`, data)
      .pipe(
        map(response => response.statusCode === 200)
      );
  }
}
