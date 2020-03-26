import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LoginService} from '../../services/login.service';
import {MustMatch} from '../../utilities/validation';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  email: string;
  submitted = false;
  resetPasswordForm: FormGroup;
  show = false;

  constructor(
    public dialogRef: MatDialogRef<ResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
        nationalIdNumber: ['', [Validators.required, Validators.minLength(4)]],
        token: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('newPassword', 'confirmPassword')
      }
    );
  }

  get form() {
    return this.resetPasswordForm.controls;
  }


  activatePassword() {
    this.submitted = true;

    if (this.resetPasswordForm.invalid) {
      return;
    }

    const data = this.resetPasswordForm.value;
    delete data.confirmPassword;
    this.loginService.passwordResetRequest(data).subscribe(d => {
      if (d.statusCode === 200) {
        this.dialogRef.close();
      }
    });
  }

  retryReset() {
    this.dialogRef.close();
  }
}
