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

}
