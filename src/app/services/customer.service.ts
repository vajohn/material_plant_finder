import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrganizationRegistrationRequest} from '../models/authentication';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {CustomerListResponse, CustomerRequest, CustomerResponse} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  registerCustomer(data: CustomerRequest, userId, branchId): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`customers/add/${userId}/${branchId}`, data);
  }

  getAllCustomers(): Observable<CustomerListResponse> {
    return this.http.get<CustomerListResponse>(`customers/`);
  }

  findCustomerByNationalID(data): Observable<CustomerResponse> {
    return this.http.post<CustomerResponse>(`customers/by-national-id-number`, data);
  }
}
