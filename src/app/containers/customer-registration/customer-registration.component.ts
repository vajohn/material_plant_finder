import {Component, OnInit} from '@angular/core';
import {OverlayRef} from '@angular/cdk/overlay';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {JWTResponse, UserDetails} from '../../models/authentication';
import {ExceptionHandler} from '../../utilities/exceptionHandler';
import {ToastrService} from 'ngx-toastr';
import {toCentsFromFour} from '../../utilities/reusables';
import {CustomerService} from '../../services/customer.service';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.scss']
})
export class CustomerRegistrationComponent implements OnInit {
  addCustomerForm: FormGroup;
  public submitted = false;
  token: JWTResponse;
  user: UserDetails;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private cs: CustomerService,
    private ls: LoginService,
  ) {
  }

  ngOnInit(): void {
    this.getInfo();

    this.addCustomerForm = this.formBuilder.group({
      address1: ['', Validators.required],
      address2: [''],
      emailAddress: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      nationalIdNumber: ['', Validators.required],
      sourceOfFunds: ['', Validators.required],
    });
    this.addCustomerForm.reset();
  }

  get f() {
    return this.addCustomerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log('clicked');
    if (this.addCustomerForm.invalid) {
      return;
    }

    this.addCustomerForm.patchValue({
      userId: this.token.userId,
      branchId: this.user.branchId
    });
    console.log('started');
    this.cs.registerCustomer(this.addCustomerForm.value, this.token.userId, this.user.branchId).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

  private getInfo() {
    this.token = this.ls.getDecodedAccessToken();
    this.user = this.ls.getDecodedUserInfo();
    // this.bs.getBuyingRate('ZWL', 'ZWL').subscribe(d => {
    //   this.rateUsed = 17.8;
    //     // this.rateUsed = d.responseBody;
    //   }
    // );
  }
}
