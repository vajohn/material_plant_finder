import {Component, OnInit} from '@angular/core';
import {OrganizationListResponse, OrganizationResponseBody} from '../../../models/organization';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {OrganizationsService} from '../../../services/organizations.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {BranchListResponse, BranchListResponseBody} from '../../../models/branches';
import {BranchesService} from '../../../services/branches.service';
import {LoginService} from "../../../services/login.service";
import {AlertService} from "../../../modals/alert/alert.service";

@Component({
  selector: 'app-branch-all',
  templateUrl: './branch-all.component.html',
  styleUrls: ['./branch-all.component.scss']
})
export class BranchAllComponent implements OnInit {
  organizations: OrganizationResponseBody[] = [];
  branches: BranchListResponseBody[] = [];
  displayedColumns = [
    'name', 'agentCode',
    'organization.companyName',
    'organization.contactPersonName',
    'organization.contactPersonMobile',
    'organization.emailAddress'
  ];
  displayedHeaders = ['Branch', 'Agent code', 'Company name', 'Contact person', 'Contact mobile', 'Contact email'];
  organizationListForm: FormGroup;
  submitted = false;

  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    public os: OrganizationsService,
    private formBuilder: FormBuilder,
    private as: AuthenticationService,
    private bs: BranchesService,
    private toast: AlertService,
    public loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.organizationListForm = this.formBuilder.group({
      searchCriteria: ['', Validators.required],
    });
  }

  private getData() {

    if(this.loginService.currentUserInfoValue.userInfo.roles[0].bank){
      this.os.getAllOrganizations().subscribe((d: OrganizationListResponse) => this.organizations = d.responseBody);
      this.bs.getAllBranches().subscribe((d: BranchListResponse) => this.branches = d.responseBody);
    }

    if(!this.loginService.currentUserInfoValue.userInfo.roles[0].bank){
      this.os.getAllBranchesByOrganization(this.loginService.currentUserInfoValue.userInfo.organization.id)
        .subscribe((d: BranchListResponse) => this.branches = d.responseBody);
      this.organizations = [];
    }

  }

  get f() {
    return this.organizationListForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.organizationListForm.invalid) {
      return;
    }


    this.bs.getBranchesByOrg(this.f.searchCriteria.value).subscribe(d => {
      this.exceptionHandler.checkResult(d);
      this.branches = d.responseBody;
    });
  }


}
