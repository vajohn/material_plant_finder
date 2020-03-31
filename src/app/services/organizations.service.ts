import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, forkJoin} from 'rxjs';
import {OrganizationListResponse, OrganizationResponse} from '../models/organization';
import {BranchListResponse} from '../models/branches';

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

  getAllBranchesByOrganization(organizationId: number): Observable<BranchListResponse> {
    return this.http.get<BranchListResponse>(`branches/by-organization/${organizationId}`);
  }

  getForUserForm(): Observable<any[]> {
    const organizations = this.http.get<OrganizationListResponse>('organizations/');
    const branches = this.http.get<BranchListResponse>('branches/by-organization/1');
    return forkJoin([organizations, branches]);
  }

}
