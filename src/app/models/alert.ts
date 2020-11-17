
import {CustomerResponseBody} from "./customer";

export interface AlertModel {
  title: string;
  description?: string;
  style?: string;
}

export interface ConfirmTransactionModel {
  user: CustomerResponseBody;
  transaction: any;
}
