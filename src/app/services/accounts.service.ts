import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountType, AccountTypesResponse} from "../models/account";
import {map} from "rxjs/operators";
import {AlertService} from "../modals/alert/alert.service";
import {DefaultResponse} from "../models/default";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  getAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountTypesResponse>(`account-types/`)
      .pipe(map(response => response.responseBody));
  }

  addAccount(data): Observable<void> {
    return this.http.post<DefaultResponse>(`accounts/add/${data.typeId}/${data.currencyId}/${data.branchId}`, data)
      .pipe(
        map(response => this.alertService.show({
          title: response.message,
          description: response.responseBody.toString(),
          style: 'success'
        }))
      );
  }
}
