import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {ResetComponent} from '../reset/reset.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  submitted = false;
  forgotPasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForgotComponent>,

    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
    });
  }

  get form() {
    return this.forgotPasswordForm.controls;
  }

  activateAccount() {
    this.dialog.open(ResetComponent, {data: {email: this.form.email.value}});
  }

  forgetPassword() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loginService.forgotPasswordRequest(this.forgotPasswordForm.value).subscribe();
  }
}
