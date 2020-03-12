import {Component, OnInit} from '@angular/core';
import {OrganizationsService} from '../../../services/organizations.service';
import {OrganizationListResponse, OrganizationResponseBody} from '../../../models/organization';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {DefaultResponse} from '../../../models/default';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.scss']
})
export class OrgListComponent implements OnInit {
  organizations: OrganizationResponseBody[] = [];
  branches: OrganizationResponseBody[] = [];
  displayedColumns = ['companyName', 'tradingName', 'emailAddress', 'contactPersonName'];
  organizationListForm: FormGroup;
  submitted = false;

  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    public os: OrganizationsService,
    private formBuilder: FormBuilder,
    private as: AuthenticationService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.os.getAllOrganizations().subscribe((d: OrganizationListResponse) => this.organizations = d.responseBody);
    this.organizationListForm = this.formBuilder.group({
      searchCriteria: ['', Validators.required],
      nameSearch: [false]
    });
  }

  get f() {
    return this.organizationListForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    let data;
    if (this.organizationListForm.invalid) {
      return;
    }

    if (!this.f.nameSearch.value) {
      data = {trade_name: this.f.searchCriteria.value};
    }

    if (this.f.nameSearch.value) {
      data = {name: this.f.searchCriteria.value};
    }

    this.os.getAllOrganizationsByNameOrTradeName(data).subscribe(d => {
      this.exceptionHandler.checkResult(d);
      console.log(d);
      this.organizations = [d.responseBody];
    });
  }

}
