import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TransactionTypeAndDate, TransactionTypeAndDateRange, UserLogin, UsersLoginResponse} from "../models/reports";
import {map} from "rxjs/operators";
import {TransactionHistory, TransactionHistoryResponseBody} from "../models/transactionHistory";

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private http: HttpClient) {
  }

  getLoginSessions(): Observable<UserLogin[]> {
    return this.http.get<UsersLoginResponse>(`login-sessions/`).pipe(map(response => response.responseBody));
  }

  getLoginSessionsByUserId(userId: number): Observable<UserLogin[]> {
    return this.http.get<UsersLoginResponse>(`login-sessions/by-user/${userId}`).pipe(map(response => response.responseBody));
  }

  getAllTransactionHistory(): Observable<TransactionHistoryResponseBody[]> {
    return this.http.get<TransactionHistory>(`transaction-data/`).pipe(map(response => response.responseBody));
  }

  getAllTransactionHistoryByTransactionType(transactionType: string): Observable<TransactionHistoryResponseBody[]> {
    return this.http.get<TransactionHistory>(`transaction-data/by-transaction-type`, {params: {transaction_type: transactionType}})
      .pipe(map(response => response.responseBody));
  }

  getAllTransactionHistoryByTransactionTypeAndDate(transactionTypeAndDate: TransactionTypeAndDate): Observable<TransactionHistoryResponseBody[]> {
    return this.http.post<TransactionHistory>(`transaction-data/by-transaction-type-and-date`, transactionTypeAndDate)
      .pipe(map(response => response.responseBody));
  }

  getAllTransactionHistoryByTransactionTypeAndDateRange(transactionTypeAndDate: TransactionTypeAndDateRange): Observable<TransactionHistoryResponseBody[]> {
    return this.http.post<TransactionHistory>(`transaction-data/by-transaction-type-and-date`, transactionTypeAndDate)
      .pipe(map(response => response.responseBody));
  }

  getAllTransactionHistoryByAgentCode(agentCode: string): Observable<TransactionHistoryResponseBody[]> {
    return this.http.get<TransactionHistory>(`transaction-data/by-agent-code`, {params: {agentCode: agentCode}})
      .pipe(map(response => response.responseBody));
  }

  getAllTransactionHistoryByBranch(data): Observable<TransactionHistoryResponseBody[]> {
    return this.http.post<TransactionHistory>(`transaction-data/by-branch`, data).pipe(map(response => response.responseBody));
  }

  getAllTransactionHistoryByOrganization(data): Observable<TransactionHistoryResponseBody[]> {
    return this.http.post<TransactionHistory>(`transaction-data/by-organization`, data).pipe(map(response => response.responseBody));
  }
}
