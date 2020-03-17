import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JWTResponse} from '../../../models/authentication';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../../../services/login.service';
import {BuyService} from '../../../services/buy.service';
import {CurrencyModel, ExchangeRate} from '../../../models/currency';
import {exchangeRateListTest} from '../../../utilities/_mockData';
import {CustomerService} from '../../../services/customer.service';
import {CurrenciesService} from '../../../services/currencies.service';
import {toTwoCents} from '../../../utilities/reusables';
import {CustomerRegistrationService} from '../../../containers/customer-registration/customer-registration.service';

@Component({
  selector: 'app-steward',
  templateUrl: './steward-buy.component.html',
  styleUrls: ['./steward-buy.component.scss']
})
export class StewardBuyComponent implements OnInit {
  buyStewardForm: FormGroup;
  checkUserForm: FormGroup;
  public submitted = false;
  public submittedID = false;
  token: JWTResponse;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);
  currencies: CurrencyModel[] = [];
  exchange: ExchangeRate[] = [];
  rateUsed: number;
  fcaAmount: number;
  currencyName: string;


  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private ls: LoginService,
    private bs: BuyService,
    private customerService: CustomerService,
    public currenciesService: CurrenciesService,
    public customerRegistrationService: CustomerRegistrationService
  ) {
  }

  ngOnInit(): void {
    this.token = this.ls.getDecodedAccessToken();
    this.currenciesService.getCurrencies().subscribe(d => this.currencies = d);
    this.exchange = exchangeRateListTest;

    this.buyStewardForm = this.formBuilder.group({
      amountPaid: ['', [Validators.required]],
      beneficiaryAccount: ['', [Validators.required]],
      currencyBought: ['', [Validators.required]],
      currencySwitchedTo: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      fcaAmount: [''],
      rateUsed: ['']
    });

    this.checkUserForm = this.formBuilder.group({
      nationalIdNumber: ['', [Validators.required]]
    });
  }

  get f() {
    return this.buyStewardForm.controls;
  }

  get g() {
    return this.checkUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.buyStewardForm.invalid) {
      return;
    }
    this.buyStewardForm.patchValue({
      userId: this.token.userId
    });
    this.bs.buyToAccount(this.buyStewardForm.value).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

  checkById() {
    this.submittedID = true;

    if (this.checkUserForm.invalid) {
      return;
    }

    this.customerService.findCustomerByNationalID(this.checkUserForm.value).subscribe(d => {
        this.exceptionHandler.checkResult(d);
        toTwoCents(0);
        this.buyStewardForm.patchValue({
          customerId: d.responseBody.id,
        });
      }
    );
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
}
