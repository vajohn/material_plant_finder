import {Component, OnInit} from '@angular/core';
import {OrganizationListResponse, OrganizationResponseBody} from '../../../models/organization';
import {BranchListResponse, BranchListResponseBody} from '../../../models/branches';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {OrganizationsService} from '../../../services/organizations.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {BranchesService} from '../../../services/branches.service';
import {ToastrService} from 'ngx-toastr';
import {UsersService} from '../../../services/users.service';
import {UsersListResponse, UsersListResponseBody} from '../../../models/users';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  organizations: OrganizationResponseBody[] = [];
  users: UsersListResponseBody[] = [];
  displayedColumns = ['firstName', 'lastName', 'roles.[0].name' , 'organization.companyName', 'branch.name'];
  organizationListForm: FormGroup;
  submitted = false;

  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    public os: OrganizationsService,
    private formBuilder: FormBuilder,
    private as: AuthenticationService,
    private us: UsersService,
    private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.us.getAllUsers().subscribe((d: UsersListResponse) => this.users = d.responseBody);
    this.os.getAllOrganizations().subscribe((d: OrganizationListResponse) => this.organizations = d.responseBody);
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


    // this.us.getUsersByOrg(this.f.searchCriteria.value).subscribe(d => {
    //   this.exceptionHandler.checkResult(d);
    //   this.users = d.responseBody;
    // });
  }
}
