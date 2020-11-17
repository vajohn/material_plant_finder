import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserDetails} from '../../../models/authentication';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {LoginService} from '../../../services/login.service';
import {BuyService} from '../../../services/buy.service';
import {CurrencyModel, ExchangeRate} from '../../../models/currency';
import {CustomerService} from '../../../services/customer.service';
import {CurrenciesService} from '../../../services/currencies.service';
import {toCentsFromFour, toTwoCents} from '../../../utilities/reusables';
import {MatSelectChange} from '@angular/material/select';
import {ReceiptComponent} from "../../../modals/receipt/receipt.component";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../modals/alert/alert.service";
import {CustomerRegistrationComponent} from "../../../modals/customer-registration/customer-registration.component";
import {BuyModel} from "../../../models/buy";
import {ConfirmPasswordComponent} from "../../../modals/confirm-password/confirm-password.component";
import {CustomerResponseBody} from "../../../models/customer";

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
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.alertService);
  currencies: CurrencyModel[] = [];
  exchange: ExchangeRate[] = [];
  rateUsed = 0.0000;
  amountPaid = 0.0000;
  currencyName: string;
  currencySwitchedName: string;
  customerNationalId = 0;
  user: UserDetails;
  customerData: CustomerResponseBody;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private ls: LoginService,
    private bs: BuyService,
    private customerService: CustomerService,
    public currenciesService: CurrenciesService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.user = this.ls.currentUserInfoValue;
    this.getOtherVariables();
    this.setForms();
    this.paying();
  }

  get f() {
    return this.buyStewardForm.controls;
  }

  get g() {
    return this.checkUserForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.submittedID = true;

    if (this.buyStewardForm.invalid || this.customerNationalId === 0 || this.checkUserForm.invalid) {
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
    const request: BuyModel.Steward = this.buyStewardForm.value;

    request.userId = this.user.userInfo.id;
    request.rateUsed = this.rateUsed;
    request.fcaAmount = toCentsFromFour(this.f.fcaAmount.value);
    request.currencyBought = this.currencyName;
    request.currencySwitchedTo = this.currencySwitchedName;
    request.amountPaid = this.amountPaid;
    request.customerId = this.customerNationalId;

    const dialogRef = this.dialog.open(ConfirmPasswordComponent, {
      data: {user: this.customerData, transaction: request},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bs.buyToAccount(request).subscribe(d => {
          this.dialog.open(ReceiptComponent, {
            data: this.exceptionHandler.checkResult(d)
          });
          this.exceptionHandler.checkResult(d);
        });
      }
    });


  }

  checkById() {
    this.submittedID = true;

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
      },
      error => console.log('found', error)
    );
  }

  onCurrencyBoughtSelect($event: MatSelectChange) {
    this.rateUsed = $event.value.buyRate;
    this.currencyName = $event.value.currency;
    // we check the amount bought to find the currency name, not the best solution
  }

  onCurrencySwitchedToSelect($event: MatSelectChange) {
    switch ($event.value) {
      case 'ZWL':
        this.currenciesService.getZWLExchange().subscribe(d => {
          this.exceptionHandler.checkResult(d);
          this.exchange = d.responseBody;
          this.currencySwitchedName = 'ZWL';
        });
        break;
      case 'USD':
        this.currencySwitchedName = 'USD';
        this.exchange = [];
        break;
      default:
        this.exchange = [];
    }

  }

  paying() {
    this.f.fcaAmount.valueChanges.subscribe(() => this.amountPaid = toTwoCents(this.rateUsed * this.f.fcaAmount.value));
  }

  private getOtherVariables() {
    this.currenciesService.getZWLExchange().subscribe(d => {
      this.exceptionHandler.checkResult(d);
      this.exchange = d.responseBody;
    });

    this.currenciesService.getCurrencies().subscribe(d => {
      const resp = this.exceptionHandler.checkResult(d);
      this.currencies = resp as CurrencyModel[];
    });
  }

  private setForms() {
    this.buyStewardForm = this.formBuilder.group({
      amountPaid: [''],
      beneficiaryAccount: ['', [Validators.required]],
      currencyBought: ['', [Validators.required]],
      currencySwitchedTo: ['', [Validators.required]],
      customerId: [''],
      fcaAmount: ['', Validators.required],
      rateUsed: [''],
      transactionType: ['SWITCH_TO_ACCOUNT'],
      userId: [0]
    });

    this.checkUserForm = this.formBuilder.group({
      nationalIdNumber: ['', [Validators.required]]
    });
  }

  addNewCustomer() {
    this.dialog.open(CustomerRegistrationComponent, {
      data: this.g.nationalIdNumber.value
    });
  }


}
