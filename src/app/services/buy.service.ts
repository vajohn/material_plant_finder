import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../models/default';
import {BuyModel} from '../models/buy';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) { }

  buyCash(data: BuyModel.Cash): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`transactions/transact/switch-from-cash`, data);
  }

  buyToAccount(data: BuyModel.Steward): Observable<DefaultResponse> {
    return this.http.post<DefaultResponse>(`transactions/transact/switch-fca-to-sbz-account`, data);
  }

}
