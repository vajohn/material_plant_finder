import {BranchListResponseBody} from "./branches";
import {CurrencyModel} from "./currency";

export interface AccountType {
  id: number;
  type: string;
}

export interface AccountTypesResponse {
  statusCode: number;
  message: string;
  responseBody: AccountType[];
}

export interface ResponseBody {
  id: number;
  accountName: string;
  accountNumber: string;
  shortCode?: any;
  dateCreated: string;
  dateUpdated: string;
  branch: BranchListResponseBody;
  currency: CurrencyModel;
  accountType: AccountType;
}

export interface AccountDetails {
  statusCode: number;
  message: string;
  responseBody: ResponseBody[];
}
