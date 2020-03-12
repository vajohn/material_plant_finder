import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  submitted = false;
  visibility = false;
  year = new Date().getFullYear();
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(public router: Router, public ls: LoginService, private formBuilder: FormBuilder, private toast: ToastrService) {
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

    this.ls.login(this.login.value).subscribe(d => {
        this.exceptionHandler.checkResult(d);
        this.router.navigateByUrl('/dashboard', {replaceUrl: true}).then(() => this.login.reset());
      }
    );
  }
}
