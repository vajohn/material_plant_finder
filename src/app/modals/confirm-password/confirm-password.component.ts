import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmTransactionModel} from "../../models/alert";
import {CustomerResponseBody} from "../../models/customer";
import {hideIdNumber} from "../../utilities/reusables";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.scss']
})
export class ConfirmPasswordComponent implements OnInit {
  public confirmationForm: FormGroup;
  public submitted = false;
  public visibility = false;
  public customer: CustomerResponseBody;
  public transactionInfo: {title: string, info: any}[] = [];

  constructor(
    public dialogRef: MatDialogRef<ConfirmPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmTransactionModel,
    private formBuilder: FormBuilder,
    private usersService: UsersService
    ) {
  }

  ngOnInit(): void {
    this.expandData();
    this.setForms();
  }

  get form() {
    return this.confirmationForm.controls;
  }


  private expandData() {
    const obj = this.data.transaction;
    this.customer = this.data.user;
    let transaction: {title: string, info: any}[] = [];
    Object.keys(obj).forEach(function(k){
      if(typeof obj[k] !== 'object'){
        console.log(k + ' - ' + obj[k]);
        transaction.push({title: k, info: obj[k]})
      }
    });
    this.transactionInfo = transaction;
  }

  mask(nationalIdNumber: any): string {
    return hideIdNumber(nationalIdNumber);
  }

  private setForms() {
    this.confirmationForm = this.formBuilder.group({
      password: ['', [Validators.required]]
    });
  }

  checkById() {
    this.submitted = true;

    if (this.confirmationForm.invalid) {
      return;
    }

    this.usersService.confirmPassword(this.confirmationForm.value, this.data.transaction.userId)
      .subscribe(result => this.dialogRef.close(result));
  }
}
