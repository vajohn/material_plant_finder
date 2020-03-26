import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BranchListResponse} from '../models/branches';
import {UsersListResponse} from '../models/users';

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

  approveUser(userId, approverId, userData): Observable<UsersListResponse> {
    return this.http.put<UsersListResponse>(`users/approve-user/${userId}/approved-by/${approverId}`, {});
  }
}
