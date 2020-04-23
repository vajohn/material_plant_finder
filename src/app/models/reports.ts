import {UsersListResponseBody} from "./users";

export interface UsersLoginResponse {
  statusCode: number;
  message: string;
  responseBody: UserLogin[];
}

export interface UserLogin {
  id: number;
  date: string;
  user: UsersListResponseBody;
}


export interface TransactionTypeAndDate {
  date: string;
  transactionType: string;
}

export interface TransactionTypeAndDateRange {
  endDate: string;
  startDate: string;
  transactionType: string;
}
