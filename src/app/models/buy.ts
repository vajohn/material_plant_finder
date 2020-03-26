export namespace BuyModel {

  export interface Cash {
    cashPaid: number;
    currencyBought: string;
    currencySwitchedTo: string;
    customerId: number;
    fcaAmount: number;
    rateUsed: number;
    transactionType: 'SWITCH_FROM_CASH';
    userId: number;
  }

  export interface Steward {
    amountPaid: number;
    beneficiaryAccount: string;
    currencyBought: string;
    currencySwitchedTo: string;
    customerId: number;
    fcaAmount: number;
    rateUsed: number;
    transactionType: 'SWITCH_TO_ACCOUNT';
    userId: number;
  }

  export interface BuyResponse {
    statusCode: number;
    message: string;
    responseBody: BuyResponseBody;
  }

  export interface BuyResponseBody {
    transactionType: string;
    customerFullName: string;
    customerMobileNumber: string;
    customerAddress: string;
    agentCode: string;
    fcaAmount: number;
    rateUsed: number;
    currencyBought: string;
    currencySwitchedTo: string;
    amountPaid?: number;
    cashPaid?: number;
    beneficiaryAccount?: string;
    transactionReference: string;
    rrnReference?: string;
    ecocashReference?: string;
  }
}
