import { Component, OnInit } from '@angular/core';
import {OrganizationListResponse, OrganizationResponseBody} from '../../../models/organization';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {OrganizationsService} from '../../../services/organizations.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {BranchListResponse, BranchListResponseBody} from '../../../models/branches';
import {BranchesService} from '../../../services/branches.service';

@Component({
  selector: 'app-branch-all',
  templateUrl: './branch-all.component.html',
  styleUrls: ['./branch-all.component.scss']
})
export class BranchAllComponent implements OnInit {
  organizations: OrganizationResponseBody[] = [];
  branches: BranchListResponseBody[] = [];
  displayedColumns = ['name', 'agentCode', 'organization.companyName'];
  organizationListForm: FormGroup;
  submitted = false;

  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    public os: OrganizationsService,
    private formBuilder: FormBuilder,
    private as: AuthenticationService,
    private bs: BranchesService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.os.getAllOrganizations().subscribe((d: OrganizationListResponse) => this.organizations = d.responseBody);
    this.bs.getAllBranches().subscribe((d: BranchListResponse) => this.branches = d.responseBody);
    this.organizationListForm = this.formBuilder.group({
      searchCriteria: ['', Validators.required],
    });
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
