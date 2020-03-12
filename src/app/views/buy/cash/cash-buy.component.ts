import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {BuyService} from '../../../services/buy.service';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
  buyCashForm: FormGroup;
  submitted = false;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);
  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private ls: LoginService,
    private bs: BuyService
  ) { }

  ngOnInit(): void {
    const token = this.ls.getDecodedAccessToken();
    this.buyCashForm = this.formBuilder.group({
      cashPaid: ['', [Validators.required, Validators.minLength(4)]],
      currencyBought: ['', [Validators.required]],
      currencySwitchedTo: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
      fcaAmount: ['', Validators.required],
      rateUsed: ['', Validators.required],
      transactionType: ['', Validators.required],
      userId: [token.userId],
    });
  }

  get f() {
    return this.buyCashForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.buyCashForm.invalid) {
      return;
    }

    this.bs.buyCash(this.buyCashForm.value).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

}
