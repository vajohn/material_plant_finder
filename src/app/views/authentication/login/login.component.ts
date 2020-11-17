import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ForgotComponent} from "../../../modals/forgot/forgot.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  submitted = false;
  visibility = false;
  response;
  year = new Date().getFullYear();

  constructor(
    public router: Router,
    public ls: LoginService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.login = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      nationalIdNumber: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.login.invalid) {
      return;
    }

    this.ls.login(this.login.value).subscribe(() => {
        this.router.navigateByUrl('/dashboard', {replaceUrl: true}).then(() => this.login.reset());
      }
    );
  }

  onForgot() {
    this.dialog.open(ForgotComponent, {});
  }
}
