import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JWTResponse} from '../../../models/authentication';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {ToastrService} from 'ngx-toastr';
import {LoginService} from '../../../services/login.service';
import {BuyService} from '../../../services/buy.service';

@Component({
  selector: 'app-steward',
  templateUrl: './steward-buy.component.html',
  styleUrls: ['./steward-buy.component.scss']
})
export class StewardBuyComponent implements OnInit {
  buyStewardForm: FormGroup;
  public submitted = false;
  token: JWTResponse;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private ls: LoginService,
    private bs: BuyService
  ) {
  }

  ngOnInit(): void {
    this.token = this.ls.getDecodedAccessToken();
    this.buyStewardForm = this.formBuilder.group({
      amountPaid: ['', [Validators.required]],
      beneficiaryAccount: ['', [Validators.required]],
      currencyBought: ['', [Validators.required]],
      currencySwitchedTo: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      fcaAmount: ['', Validators.required],
      rateUsed: ['', Validators.required]
    });
  }

  get f() {
    return this.buyStewardForm.controls;
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
}
