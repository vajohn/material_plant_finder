import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {ExceptionHandler} from '../../../utilities/exceptionHandler' ;

@Component({
  selector: 'app-org-add',
  templateUrl: './org-add.component.html',
  styleUrls: ['./org-add.component.scss']
})
export class OrgAddComponent implements OnInit {
  organizationForm: FormGroup;
  submitted = false;
  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toastr);


  constructor(private formBuilder: FormBuilder, private as: AuthenticationService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.organizationForm = this.formBuilder.group({
      companyName: ['', [Validators.required]],
      companyNumber: ['', [Validators.required]],
      contactPersonMobile: ['', [Validators.required, Validators.minLength(4)]],
      contactPersonName: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      // organizationLogoUrl: [''],
      physicalAddress: ['', [Validators.required]],
      tradingName: ['', [Validators.required]]
    });
  }

  get f() {
    return this.organizationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.organizationForm.invalid) {
      return;
    }

    this.as.registerOrganization(this.organizationForm.value).subscribe(d => {
      this.exceptionHandler.checkResult(d);
    });
  }

}
