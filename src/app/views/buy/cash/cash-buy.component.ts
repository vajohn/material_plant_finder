import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {BuyService} from '../../../services/buy.service';
import {LoginService} from '../../../services/login.service';
import {UserDetails} from '../../../models/authentication';
import {AuthenticationService} from '../../../services/authentication.service';
import {toCentsFromFour, toTwoCents} from '../../../utilities/reusables';
import {CustomerService} from '../../../services/customer.service';
import {CurrenciesService} from '../../../services/currencies.service';
import {CurrencyModel, ExchangeRate} from '../../../models/currency';
import {MatDialog} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material/select';
import {CustomerRegistrationService} from "../../../modals/customer-registration/customer-registration.service";
import {ReceiptComponent} from "../../../modals/receipt/receipt.component";
import {CustomerRegistrationComponent} from "../../../modals/customer-registration/customer-registration.component";
import {AlertService} from "../../../modals/alert/alert.service";

@Component({
  selector: 'app-cash',
  templateUrl: './cash-buy.component.html',
  styleUrls: ['./cash-buy.component.scss']
})
export class CashBuyComponent implements OnInit {
  buyCashForm: FormGroup;
  checkUserForm: FormGroup;
  user: UserDetails;
  public submitted = false;
  public submittedOne = false;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.alertService);
  currencies: CurrencyModel[] = [];
  exchange: ExchangeRate[] = [];
  rateUsed = 0.0000;
  fcaAmount = 0.0000;
  currencyName: string;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private ls: LoginService,
    private bs: BuyService,
    private as: AuthenticationService,
    public cs: CustomerRegistrationService,
    private customerService: CustomerService,
    public currenciesService: CurrenciesService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.user = this.ls.currentUserInfoValue;
    this.setForms();
    this.getOtherVariables();
    this.paying();
  }

  get fg() {
    return this.checkUserForm.controls;
  }

  get f() {
    return this.buyCashForm.controls;
  }

  buyCash() {
    this.submitted = true;
    this.submittedOne = true;
    if (this.buyCashForm.invalid) {
      return;
    }

    if (this.checkUserForm.invalid) {
      return;
    }
    // console.time('tranStart');
    this.buyCashForm.patchValue({
      userId: this.user.userInfo.id,
      rateUsed: this.rateUsed,
      fcaAmount: toCentsFromFour(this.fcaAmount),
      currencySwitchedTo: this.currencyName
    });

    this.bs.buyCash(this.buyCashForm.value).subscribe(d => {
      const dialogRef = this.dialog.open(ReceiptComponent, {
        data: this.exceptionHandler.checkResult(d)
      });
      dialogRef.afterClosed().subscribe(() => this.buyCashForm.reset());
    });
  }

  onCurrencyBoughtSelect($event: MatSelectChange) {
    switch ($event.value) {
      case 'ZWL':
        // this.exchange = exchangeRateListTest;
        this.currenciesService.getZWLExchange().subscribe(d => {
          this.exceptionHandler.checkResult(d);
          this.exchange = d.responseBody;
        });
        break;
      case 'USD':
        this.exchange = [];
        break;
      default:
        this.exchange = [];
    }

    // this.currenciesService.getZWL().subscribe(d => {
    //   this.exceptionHandler.checkResult(d);
    // });
  }

  onCurrencySwitchedToSelect($event: MatSelectChange) {

    this.rateUsed = $event.value;
    // we check the amount bought to find the currency name, not the best solution
    this.exchange.forEach(result => {
      if (result.buyRate === $event.value) {
        this.currencyName = result.currency;
      }
    });

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
        this.exceptionHandler.checkResult(d);
        toTwoCents(0);
        this.buyCashForm.patchValue({
          customerId: d.responseBody.id,
        });
      }
    );
  }

  addNewCustomer() {
    this.dialog.open(CustomerRegistrationComponent, {
      data: this.fg.nationalIdNumber.value
    });
  }

  private setForms() {
    this.buyCashForm = this.formBuilder.group({
      cashPaid: ['', [Validators.required]],
      currencyBought: ['', [Validators.required]],
      currencySwitchedTo: ['', [Validators.required]],
      customerId: ['', Validators.required],
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
