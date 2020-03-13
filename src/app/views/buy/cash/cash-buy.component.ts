import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {ToastrService} from 'ngx-toastr';
import {BuyService} from '../../../services/buy.service';
import {LoginService} from '../../../services/login.service';
import {JWTResponse} from '../../../models/authentication';
import {currencyListTest, exchangeRateListTest} from '../../../utilities/_mockData';
import {AuthenticationService} from '../../../services/authentication.service';
import {toCentsFromFour, toTwoCents} from '../../../utilities/reusables';
import {CustomerRegistrationService} from '../../../containers/customer-registration/customer-registration.service';
import {CustomerService} from '../../../services/customer.service';
import {CurrenciesService} from '../../../services/currencies.service';
import {CurrencyModel, ExchangeRate} from '../../../models/currency';

@Component({
  selector: 'app-cash',
  templateUrl: './cash-buy.component.html',
  styleUrls: ['./cash-buy.component.scss']
})
export class CashBuyComponent implements OnInit {
  buyCashForm: FormGroup;
  public submitted = false;
  public submittedOne = false;
  token: JWTResponse;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);
  currencies: CurrencyModel[] = [];
  exchange: ExchangeRate[] = [];
  rateUsed: number;
  fcaAmount: number;
  currencyName: string;
  checkUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private ls: LoginService,
    private bs: BuyService,
    private as: AuthenticationService,
    public cs: CustomerRegistrationService,
    private customerService: CustomerService,
    public currenciesService: CurrenciesService
  ) {
  }

  ngOnInit(): void {
    this.currenciesService.getCurrencies().subscribe(d => this.currencies = d);
    this.exchange = exchangeRateListTest;
    // this.currenciesService.getZWL().subscribe(d => {
    //   this.exceptionHandler.checkResult(d);
    // });
    this.buyCashForm = this.formBuilder.group({
      cashPaid: [0, [Validators.required]],
      currencyBought: ['', [Validators.required]],
      currencySwitchedTo: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      rateUsed: [0],
      fcaAmount: [0],
      userId: [0],
      transactionType: ['SWITCH_FROM_CASH'],
    });

    this.checkUserForm = this.formBuilder.group({
      nationalIdNumber: ['', [Validators.required]]
    });
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

    if (this.buyCashForm.invalid) {
      return;
    }
    this.buyCashForm.patchValue({
      userId: this.token.userId,
      rateUsed: this.rateUsed,
      fcaAmount: toCentsFromFour(this.fcaAmount),
      currencySwitchedTo: this.currencyName
    });

    this.bs.buyCash(this.buyCashForm.value).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

  onCurrencyBoughtSelect($event: Event) {

    switch (this.f.currencyBought.value) {
      case 'ZWL':
        this.exchange = exchangeRateListTest;
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

  onCurrencySwitchedToSelect($event: Event) {

    this.rateUsed = this.f.currencySwitchedTo.value;
    // we check the amount bought to find the currency name, not the best solution
    this.exchange.forEach(result => {
      if (result.buyrate === this.f.currencySwitchedTo.value) {
        this.currencyName = result.currency;
      }
    });

  }


  private getOtherVariables() {
    this.token = this.ls.getDecodedAccessToken();
    // this.bs.getBuyingRate('ZWL', 'ZWL').subscribe(d => {
    //   this.rateUsed = 17.8;
    //     // this.rateUsed = d.responseBody;
    //   }
    // );
  }


  paying() {
    this.f.cashPaid.valueChanges.subscribe(v => this.fcaAmount = toTwoCents(this.rateUsed * this.f.cashPaid.value));
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

}
