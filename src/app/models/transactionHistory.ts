export interface TransactionHistory {
  statusCode: number;
  message: string;
  responseBody: TransactionHistoryResponseBody[];
}

export interface TransactionHistoryResponseBody {
  id: number;
  inputterFirstName: string;
  inputterLastName: string;
  inputterBranch: string;
  inputterAgentCode: string;
  organizationName: string;
  transactionType: string;
  transactionStatus: string;
  currency: string;
  customerFirstName: string;
  customerLastName: string;
  customerIdNumber: string;
  customerMobileNumber: string;
  purposeOfFunds?: any;
  rateUsed: number;
  amount: number;
  customerAccountNumber?: any;
  branchName?: any;
  debitEcocashNumber?: any;
  creditEcocashNumber?: any;
  ecocashName?: any;
  debitAccountNumber?: any;
  creditAccountNumber?: any;
  debitAccountName?: any;
  creditAccountName?: any;
  foreignAccount?: any;
  stewardAccount?: string;
  beneficiaryName: string;
  sortCode?: any;
  reference: string;
  rrnReference?: string;
  ecocashReference?: any;
  dateCreated: string;
  dateUpdated: string;
}
