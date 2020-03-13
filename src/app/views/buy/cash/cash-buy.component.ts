import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {ToastrService} from 'ngx-toastr';
import {BuyService} from '../../../services/buy.service';
import {LoginService} from '../../../services/login.service';
import {JWTResponse} from '../../../models/authentication';
import {currencyListTest} from '../../../utilities/_mockData';
import {AuthenticationService} from '../../../services/authentication.service';
import {toCentsFromFour} from '../../../utilities/reusables';
import {CustomerRegistrationService} from '../../../containers/customer-registration/customer-registration.service';
import {CustomerService} from '../../../services/customer.service';
import {CurrenciesService} from '../../../services/currencies.service';

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
  currencies = currencyListTest;
  exchange = currencyListTest;
  rateUsed: number;
  fcaAmount: number;
  checkUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private ls: LoginService,
    private bs: BuyService,
    private as: AuthenticationService,
    public cs: CustomerRegistrationService,
    private customerService: CustomerService,
    private currenciesService: CurrenciesService
  ) {
  }

  ngOnInit(): void {

    this.buyCashForm = this.formBuilder.group({
      cashPaid: [0, [Validators.required, Validators.minLength(4)]],
      currencyBought: ['', [Validators.required]],
      currencySwitchedTo: ['', [Validators.required]],
      customerId: ['', [Validators.required]]
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

  onSubmit() {
    this.submitted = true;

    if (this.buyCashForm.invalid) {
      return;
    }
    this.buyCashForm.patchValue({
      userId: this.token.userId,
      rateUsed: this.rateUsed,
      fcaAmount: toCentsFromFour(this.fcaAmount)
    });
    this.bs.buyCash(this.buyCashForm.value).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

  onCurrencyBoughtSelect($event: Event) {
    // todo: assign the value of rates bought
  }

  onCurrencySwitchedToSelect($event: Event) {

    if (this.f.currencyBought.value === 'ZWL' && this.f.currencySwitchedTo.value === 'ZWL'
      || this.f.currencyBought.value === 'USD' && this.f.currencySwitchedTo.value === 'USD') {
      this.rateUsed = 1;
    }
    if (this.f.currencyBought.value === 'USD' && this.f.currencySwitchedTo.value === 'ZWL') {
      this.rateUsed = 17.6079;
    }
    if (this.f.currencyBought.value === 'ZWL' && this.f.currencySwitchedTo.value === 'USD') {
      this.rateUsed = 0.1;
    }
    this.bs.getBuyingRate(this.f.currencyBought.value, this.f.currencySwitchedTo.value).subscribe(d => {
        // this.rateUsed = d.responseBody;
        // todo assign the value of rates switched to
        // todo round down
      }
    );
  }


  private getOtherVariables() {
    this.token = this.ls.getDecodedAccessToken();
    this.rateUsed = 17.8;
    // this.bs.getBuyingRate('ZWL', 'ZWL').subscribe(d => {
    //   this.rateUsed = 17.8;
    //     // this.rateUsed = d.responseBody;
    //   }
    // );
  }


  paying() {
    this.f.cashPaid.valueChanges.subscribe(v => this.fcaAmount = this.rateUsed * this.f.cashPaid.value);
  }

  addNewCustomer() {

  }

  checkForCustomer() {

    if (this.f.customerId.invalid) {
      this.toast.error('Please insert customer ID', 'Error on customer check');
    }

    if (!this.f.customerId.invalid) {
      this.as.checkForCustomer(this.f.customerId.value).subscribe(d =>
        this.exceptionHandler.checkResult(d)
      );
    }
  }


  checkById() {
    this.submittedOne = true;

    if (this.checkUserForm.invalid) {
      return;
    }

    this.customerService.findCustomerByNationalID(this.checkUserForm.value).subscribe(d => {
        this.exceptionHandler.checkResult(d);

        this.buyCashForm.patchValue({
          customerId: d.responseBody.id,
        });
      }
    );
  }
}
