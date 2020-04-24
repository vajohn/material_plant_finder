import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoleListResponse} from '../models/authentication';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) {
  }

  getSpecificRoles(group = 'agent-roles'): Observable<RoleListResponse> {
    return this.http.get<RoleListResponse>(`roles/${group}`);
  }
}
