import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {BuyService} from '../../../services/buy.service';
import {LoginService} from '../../../services/login.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {toCentsFromFour, toTwoCents} from '../../../utilities/reusables';
import {CustomerService} from '../../../services/customer.service';
import {CurrenciesService} from '../../../services/currencies.service';
import {CurrencyModel, ExchangeRate} from '../../../models/currency';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {ReceiptComponent} from '../../../modals/receipt/receipt.component';
import {CustomerRegistrationComponent} from '../../../modals/customer-registration/customer-registration.component';
import {AlertService} from "../../../modals/alert/alert.service";
import {BuyModel} from "../../../models/buy";
import {CustomerResponseBody} from "../../../models/customer";
import {ConfirmPasswordComponent} from "../../../modals/confirm-password/confirm-password.component";

@Component({
  selector: 'app-cash',
  templateUrl: './cash-buy.component.html',
  styleUrls: ['./cash-buy.component.scss']
})
export class CashBuyComponent implements OnInit {
  buyCashForm: FormGroup;
  checkUserForm: FormGroup;
  user: number;
  public submitted = false;
  public submittedOne = false;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.alertService);
  currencies: CurrencyModel[] = [];
  exchange: ExchangeRate[] = [];
  rateUsed = 0.0000;
  fcaAmount = 0.0000;
  customerNationalId = 0;
  currencyName: string;
  currencySwitchedName: string;
  customerData: CustomerResponseBody;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private ls: LoginService,
    private bs: BuyService,
    private as: AuthenticationService,
    private customerService: CustomerService,
    public currenciesService: CurrenciesService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.user = this.ls.currentUserInfoValue.userInfo.id;
    this.setForms();
    this.getOtherVariables();
    this.paying();
  }

  get g() {
    return this.checkUserForm.controls;
  }

  get f() {
    return this.buyCashForm.controls;
  }

  buyCash() {
    this.submitted = true;
    this.submittedOne = true;

    if (this.buyCashForm.invalid || this.customerNationalId === 0 || this.checkUserForm.invalid) {
      if (this.customerNationalId === 0) {
        this.alertService.show({
          title: `Customer details error`,
          description: `Please add customer to the transaction`,
          style: 'error'
        });
        return;
      }
      return;
    }

    const request: BuyModel.Cash = this.buyCashForm.value;

    request.rateUsed = this.rateUsed;
    request.fcaAmount = toCentsFromFour(this.fcaAmount);
    request.userId = this.user;
    request.currencyBought = this.currencyName;
    request.currencySwitchedTo = this.currencySwitchedName;
    request.customerId = this.customerNationalId;
    const dialogRef = this.dialog.open(ConfirmPasswordComponent, {
      data: {user: this.customerData, transaction: request},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bs.buyCash(request).subscribe(d => {
          const dialogRef = this.dialog.open(ReceiptComponent, {
            data: this.exceptionHandler.checkResult(d)
          });
          dialogRef.afterClosed().subscribe(() => this.buyCashForm.reset());
        });
      }
    });
  }

  onCurrencyBoughtSelect($event: MatSelectChange) {
    switch ($event.value) {
      case 'ZWL':
        // this.exchange = exchangeRateListTest;
        this.currenciesService.getZWLExchange().subscribe(d => {
          this.exceptionHandler.checkResult(d);
          this.exchange = d.responseBody;
          this.currencySwitchedName = 'ZWL';
        });
        break;
      case 'USD':
        this.exchange = [];
        this.currencySwitchedName = 'USD';

        break;
      default:
        this.exchange = [];
    }
  }

  onCurrencySwitchedToSelect($event: MatSelectChange) {
    console.log('cur selc' + $event.value.currency);
    this.rateUsed = $event.value.buyRate;
    this.currencyName = $event.value.currency;
    // we check the amount bought to find the currency name, not the best solution
  }


  private getOtherVariables() {
    this.currenciesService.getCurrencies().subscribe(d => {
      const resp = this.exceptionHandler.checkResult(d);
      this.currencies = resp as CurrencyModel[];
    });

    this.currenciesService.getZWLExchange().subscribe(d => {
      this.exceptionHandler.checkResult(d);
      this.exchange = d.responseBody;
    });
  }


  paying() {
    this.f.cashPaid.valueChanges.subscribe(() => this.fcaAmount = toTwoCents(this.rateUsed * this.f.cashPaid.value));
  }

  checkById() {
    this.submittedOne = true;

    if (this.checkUserForm.invalid) {
      return;
    }

    this.customerService.findCustomerByNationalID(this.checkUserForm.value).subscribe(d => {
        this.alertService.show({
          title: `Success ${d.responseBody.firstName} ${d.responseBody.lastName}`,
          description: `Found user with ${d.responseBody.nationalIdNumber}`,
          style: 'success'
        });
        toTwoCents(0);
        this.customerNationalId = d.responseBody.id;
        this.customerData = d.responseBody;
      }
    );
  }

  addNewCustomer() {
    this.dialog.open(CustomerRegistrationComponent, {
      data: this.g.nationalIdNumber.value
    });
  }

  private setForms() {
    this.buyCashForm = this.formBuilder.group({
      cashPaid: ['',],
      currencyBought: ['',],
      currencySwitchedTo: ['',],
      customerId: ['',],
      rateUsed: [0],
      fcaAmount: [0],
      userId: [0],
      transactionType: ['SWITCH_FROM_CASH'],
    });

    this.checkUserForm = this.formBuilder.group({
      nationalIdNumber: ['', [Validators.required]]
    });
  }
}
