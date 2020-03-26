import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BranchRegistrationRequest, OrganizationRegistrationRequest, UserRegistrationRequest } from '../models/authentication';
import { DefaultResponse } from '../models/default';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  registerOrganization(data: OrganizationRegistrationRequest): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`organizations/add`, data);
  }

  registerUser(data: UserRegistrationRequest, branchId: number, roleId: number): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`users/register/${branchId}/${roleId}`, data);
  }

  registerBranch(data: BranchRegistrationRequest, organizationId: number): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`branches/add/${organizationId}`, data);
  }

  getRoles(): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`roles/`);
  }

  checkForCustomer(customerId: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`/${customerId}`);
  }


}
