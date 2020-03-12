import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable, forkJoin} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {OrganizationListResponse, OrganizationResponse} from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private http: HttpClient) {
  }

  getAllOrganizations(): Observable<OrganizationListResponse> {
    return this.http.get<OrganizationListResponse>(`organizations/`);
  }

  getAllOrganizationsByNameOrTradeName(data): Observable<OrganizationResponse> {
    return this.http.get<OrganizationResponse>(`organizations/by-name-or-trading-name/`,  {params: data});
  }

  getAllBranchesByOrganization(branchId: number): Observable<DefaultResponse> {
    return this.http.get<DefaultResponse>(`branches/by-organization/${branchId}`);
  }

  getForUserForm(): Observable<any[]> {
    const organizations = this.http.get<DefaultResponse>('organizations/');
    const branches = this.http.get<DefaultResponse>('branches/by-organization/1');
    const roles = this.http.get<DefaultResponse>('roles/');
    return forkJoin([organizations, branches, roles]);
  }

}
