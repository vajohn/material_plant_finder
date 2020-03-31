import {Component, OnInit} from '@angular/core';
import { OrganizationResponseBody} from '../../../models/organization';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ExceptionHandler} from '../../../utilities/exceptionHandler';
import {OrganizationsService} from '../../../services/organizations.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {UsersService} from '../../../services/users.service';
import {UsersListResponse, UsersListResponseBody} from '../../../models/users';
import {LoginService} from '../../../services/login.service';
import {MatDialog} from '@angular/material/dialog';
import {UserDetails} from '../../../models/authentication';
import {ApproveComponent} from "../../../modals/approve/approve.component";
import {AlertService} from "../../../modals/alert/alert.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  organizations: OrganizationResponseBody[] = [];
  users: UsersListResponseBody[] = [];
  displayedColumns = ['firstName', 'lastName', 'roles.[0].name', 'organization.companyName', 'branch.name', 'hasBeenApproved'];
  displayedHeaders = ['First name', 'Surname', 'Role', 'Organization', 'Branch', 'Approved', ''];
  user: UserDetails;
  organizationListForm: FormGroup;
  submitted = false;

  private exceptionHandler: ExceptionHandler = new ExceptionHandler(this.toast);

  constructor(
    public os: OrganizationsService,
    private formBuilder: FormBuilder,
    private as: AuthenticationService,
    private us: UsersService,
    private toast: AlertService,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.user = this.loginService.currentUserInfoValue;
    this.getUsers();
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

  }

  approveUser(userData: UsersListResponseBody) {
    const dialogRef = this.dialog.open(ApproveComponent, {
      width: '250px',
      data: {statement: 'approve user'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.us.approveUser(userData.id, this.loginService.currentUserInfoValue.userInfo.id, userData).subscribe(d => {
          this.exceptionHandler.checkResult(d);
          this.users = d.responseBody;
        });
      }
    });

  }

  private getUsers() {
    // this.us.getAllUsers().subscribe((d: UsersListResponse) => this.users = d.responseBody);
    // this.os.getAllOrganizations().subscribe((d: OrganizationListResponse) => this.organizations = d.responseBody);
    if (this.user.userInfo.roles[0].admin) {
      this.us.getUsersByOrg(this.user.userInfo.organization.id).subscribe((d: UsersListResponse) => this.users = d.responseBody);
      this.organizations = [this.user.userInfo.organization];
    }

  }
}
