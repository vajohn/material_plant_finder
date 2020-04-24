import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApproveUserResponse, UsersListResponse} from '../models/users';

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
}
