import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {BranchListResponse} from '../models/branches';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }

  getAllBranches(): Observable<BranchListResponse> {
    return this.http.get<BranchListResponse>(`branches/`);
  }

  getBranchesByOrg(orgId: number): Observable<BranchListResponse> {
    return this.http.get<BranchListResponse>(`branches/by-organization/${orgId}`);
  }
}
