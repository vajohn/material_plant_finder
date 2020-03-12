import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationRegistrationRequest} from '../models/authentication';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {CustomerRequest} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  registerCustomer(data: CustomerRequest, userId, branchId): Observable<DefaultResponse> {
    console.log('posting');

    return this.http.post<DefaultResponse>(`customers/add/${userId}/${branchId}`, data);
  }
}
